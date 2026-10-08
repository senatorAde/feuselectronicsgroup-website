"""Validate path-scoped documentation impact against a Git baseline."""
from __future__ import annotations

import argparse
import fnmatch
import json
import re
import subprocess
from pathlib import Path
from typing import Any


class DocumentationImpactError(ValueError):
    pass


def git(root: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(root), *args], capture_output=True, text=True, check=True,
    )
    return result.stdout


def safe_path(root: Path, name: str) -> Path:
    if not isinstance(name, str) or not name or "\\" in name:
        raise DocumentationImpactError("paths must be nonempty repository-relative POSIX paths")
    path = (root / name).resolve()
    if Path(name).is_absolute() or ".." in Path(name).parts or not path.is_relative_to(root.resolve()):
        raise DocumentationImpactError(f"path escapes repository: {name}")
    return path


def validate(
    root: Path, changed: set[str], policy: dict[str, Any], record: dict[str, Any],
    *, head: str, reviews: list[dict[str, Any]] | None = None,
) -> list[str]:
    if policy.get("schema_version") != 1 or record.get("schema_version") != 1:
        raise DocumentationImpactError("unsupported documentation impact schema")
    scopes = policy.get("scopes")
    entries = record.get("impacts")
    if not isinstance(scopes, list) or not isinstance(entries, list):
        raise DocumentationImpactError("scopes and impacts must be lists")
    indexed = {}
    for entry in entries:
        if not isinstance(entry, dict) or entry.get("scope") in indexed:
            raise DocumentationImpactError("invalid or duplicate impact scope")
        indexed[entry.get("scope")] = entry
    known = {scope["id"] for scope in scopes}
    if set(indexed) - known:
        raise DocumentationImpactError("unknown impact scope")
    affected = []
    for scope in scopes:
        paths = [p for p in changed if any(fnmatch.fnmatchcase(p, pattern) for pattern in scope["paths"])]
        if not paths:
            continue
        affected.append(scope["id"])
        entry = indexed.get(scope["id"])
        if entry is None:
            raise DocumentationImpactError(f"missing impact review: {scope['id']} ({paths[0]})")
        if entry.get("decision") == "no_documentation_impact":
            if not isinstance(entry.get("reason"), str) or len(entry["reason"].strip()) < 30:
                raise DocumentationImpactError("no-impact decision needs a substantive explanation")
            latest: dict[str, dict[str, Any]] = {}
            for review in reviews or []:
                user = review.get("user", {})
                if (
                    review.get("commit_id") == head
                    and user.get("type") == "User"
                    and user.get("login")
                    and review.get("author_association") in {"OWNER", "MEMBER", "COLLABORATOR"}
                ):
                    latest[user["login"]] = review
            if not any(r.get("state") == "APPROVED" for r in latest.values()):
                raise DocumentationImpactError("no-impact decision requires an authorized human GitHub approval on this exact head")
        elif entry.get("decision") == "updated":
            docs = entry.get("documents")
            if not isinstance(docs, list) or not docs:
                raise DocumentationImpactError("updated decision requires documents")
            for name in docs:
                path = safe_path(root, name)
                if not any(fnmatch.fnmatchcase(name, pattern) for pattern in scope["documents"]):
                    raise DocumentationImpactError(f"non-authoritative document for {scope['id']}: {name}")
                if name not in changed or not path.is_file() or path.suffix != ".md":
                    raise DocumentationImpactError(f"document must exist and change in this revision: {name}")
                content = path.read_text(encoding="utf-8")
                if len(content.strip()) < 80:
                    raise DocumentationImpactError(f"document is empty or insufficient: {name}")
                for target in re.findall(r"\[[^\]]+\]\(([^)\s]+)\)", content):
                    if re.match(r"[a-zA-Z][a-zA-Z0-9+.-]*:", target) or target.startswith("#"):
                        continue
                    relative = target.split("#", 1)[0]
                    if relative and not (path.parent / relative).resolve().exists():
                        raise DocumentationImpactError(f"broken local link in {name}: {target}")
        else:
            raise DocumentationImpactError("decision must be updated or no_documentation_impact")
    return affected


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", required=True, help="trusted comparison commit, not a record-provided ref")
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--reviews", type=Path, help="GitHub review response retrieved by CI, never a PR file")
    args = parser.parse_args()
    root = args.root.resolve()
    policy_name = ".github/documentation-policy.json"
    record_name = ".github/documentation-impact.json"
    try:
        base = git(root, "rev-parse", "--verify", f"{args.base}^{{commit}}").strip()
        head = git(root, "rev-parse", "HEAD").strip()
        # Rename detection reports only the destination; a protected source path must stay visible.
        changed = set(git(root, "diff", "--name-only", "--no-renames", base).splitlines())
        changed.update(git(root, "ls-files", "--others", "--exclude-standard").splitlines())
        # Existing baseline policy governs a PR; a PR cannot weaken its own gate.
        prior_exists = bool(git(root, "ls-tree", "--name-only", base, "--", policy_name).strip())
        policy = (
            json.loads(git(root, "show", f"{base}:{policy_name}"))
            if prior_exists else json.loads((root / policy_name).read_text())
        )
        record = json.loads((root / record_name).read_text())
        reviews = json.loads(args.reviews.read_text()) if args.reviews else None
        affected = validate(root, changed, policy, record, head=head, reviews=reviews)
        print(json.dumps({"status": "PASS", "scopes": affected, "base": base, "head": head}))
        return 0
    except (DocumentationImpactError, OSError, ValueError, KeyError, TypeError, subprocess.CalledProcessError) as exc:
        print(json.dumps({"status": "FAIL", "error": str(exc)}))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
