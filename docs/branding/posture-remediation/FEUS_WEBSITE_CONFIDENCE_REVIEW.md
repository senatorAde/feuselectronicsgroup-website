# FEUS.ai Website Confidence Review

**Date:** 2026-08-13
**Reviewer role:** Enterprise UX content strategy and public-claims governance
**Question asked of every surface:** *Would a qualified enterprise buyer, a security
reviewer, and an internal engineer each get what they came for — without any of them
being misled?*

---

## 1. Summary judgement

Before remediation the site was **accurate and unpersuasive**. Its factual content was
defensible; its presentation was not. A single exact-revision engineering decision was
carrying the visual weight of a service outage on every page, including the pages whose
only job is to start a conversation.

After remediation the site is **accurate and persuasive**. No claim was strengthened. The
same facts are present, in greater structural clarity, addressed to the audience that
actually needs each one.

The decisive insight: *honesty is a property of the whole disclosure system, not of every
individual pixel.* Repeating a narrow caveat everywhere does not increase honesty — it
degrades signal, so that when a caveat genuinely matters (Oracle has no live driver;
model invocation is disabled) the reader has already learned to skip it.

## 2. Surface-by-surface assessment

### `/` — Homepage
**Before:** Red banner above the fold; platform section closing on a `NO-GO` footnote;
amber caution styling on product cards.
**After:** Value and architecture lead. The lifecycle is described as a controlled
process, not a deficiency. Closes with an accurate scope qualifier and a route to
per-capability status. CTAs are "Explore FEUS.ai" and "Book a consultation".
**Confidence:** Strong. The page now asserts what FEUS.ai *is* before qualifying where it
runs — which is the correct order for a positioning surface.

### `/feus-ai` — Primary product page
**Before:** Red banner, then hero, then a rose-bordered release decision, then a 45-row
capability matrix, then twelve known limitations. A prospect reached three blocks of
boundary content before reaching a single reason to care.
**After:** Outcome-led hero ("Governed AI for Data Operations"), the governed experience
described end to end from Hello FEUS onboarding through operational workflows, the agent
portfolio, then an "Evaluate FEUS.ai for your environment" adoption section, then a
measured Trust Center pointer.
**Confidence:** Strong — this is the largest single improvement on the site. The removed
content was not deleted; it was moved to `/status` and `/trust`, where a reviewer looking
for it will find it faster than they did buried mid-product-page.

### `/solutions`
**Before:** A `NO-GO` sentence inside solution copy.
**After:** Solution value, then three clear routes: Explore FEUS.ai, Request a demo,
Capability status.
**Confidence:** Strong.

### `/copilot` and `/demo`
**Before:** Both carried the sitewide red banner. On `/demo` this sat directly above the
`DEMO_DISCLAIMER`, so the page led with two overlapping warnings, one general and vague,
one specific and useful.
**After:** Banner removed from both. `DEMO_DISCLAIMER` retained verbatim.
**Confidence:** Strong. Removing the generic warning made the specific one legible.

### `/contact`, `/services`
Never carried the banner. Adoption CTAs and the Calendly consultation path are
unobstructed; the inquiry-type list retains "Request a Controlled Demonstration of
FEUS.ai", which is an honest and appealing framing.
**Confidence:** Adequate. No change required.

### `/sqlops`, `/control-plane`, `/requestops`, `/agents/oracle`, `/integrations/itsm`
**Before:** Headings such as "What does not exist yet" and "Boundaries and gaps" in rose
treatment.
**After:** "Current boundaries" and "Preview boundaries" in neutral slate. Restriction
text is unchanged word for word.
**Confidence:** Strong. A preview capability that publishes its own environment scope,
its own restriction, and its own next milestone reads as *disciplined*. The same content
in red read as *broken*. This is the clearest demonstration that the remediation changed
framing rather than truth.

### `/trust`, `/trust/security`, `/trust/compliance`, `/status`, `/architecture`, `/assurance`, `/faq`
**Before:** Complete but preceded by the same sitewide banner as the marketing pages, so
the Trust Center had no distinct identity.
**After:** These are now the designated home of exact-revision detail. `/trust` opens with
the approved posture statement, proceeds through sections A–I, and closes on the
disclosure boundary. `/status` gained the full capability matrix. The `NO-GO` decision,
the revision hash, the 38 control counts, and all twelve known limitations are intact.
**Confidence:** Strong, and materially more useful to a security reviewer than before.

### `/release-notes`
Internal engineering history retained in full; only the rose left border was neutralised.
**Confidence:** Adequate. Correctly identified as layer 4 content.

## 3. Colour and signal discipline

Red/rose now appears in exactly one place: the "Evidence snapshot data is unavailable"
state on `/assurance`. That is a real error. Every other former rose treatment described
a normal, planned, disclosed lifecycle state and has been moved to neutral slate or
`feus` accent.

This is the single change most responsible for the shift in perceived maturity. A site
that reserves its alarm colour is a site whose alarm colour means something.

## 4. Accessibility notes

- The new `PlatformStatusStrip` uses `aria-label="FEUS.ai capability status"` and an
  informational `Info` icon rather than an alert role — semantically correct, since it no
  longer conveys an alert.
- Neutral slate and `feus-300` replacements were checked against `navy-950` for contrast;
  the `text-gray-400` next-milestone text is the lowest-contrast new element and remains
  supplementary rather than sole-source information.
- Removing the strip from `/feus-ai`, `/demo`, and `/copilot` removed a layout spacer;
  hero padding was raised from `pt-24` to `pt-32` on all three to prevent fixed-navbar
  overlap at every breakpoint.
- The repository has no automated accessibility harness. Contrast and landmark review was
  manual. Recorded as a residual item.

## 5. Governance assessment

The most important outcome is not the copy — it is that the copy is now **structurally
prevented from drifting**. `scripts/validate-public-claims.mjs` gained a containment rule
that fails the build if release-gate vocabulary appears outside an explicit Trust Center
allowlist, plus positive checks that the nine `POSTURE` marketing fields exist and are
themselves free of release-gate language. The negation escape hatch was disabled for
these rules specifically, closing a real bypass.

The gate was mutation-tested and correctly failed on an injected violation.

The website therefore maintains **no independent hand-edited posture**. Every public
posture string resolves to `src/data/publicStatus.js`, and every exact-revision fact
resolves to `RELEASE_ASSESSMENT` within it.

## 6. What a reviewer should still push on

1. **Bundle locality.** `NO-GO` and `above LOCAL` still ship inside the single 590 kB
   JavaScript chunk because the Trust Center is not code-split. Not user-visible on
   marketing routes, but route-level splitting would make the disclosure boundary
   physical rather than merely logical.
2. **No automated a11y or visual-regression testing.** The claims gate is excellent; the
   accessibility story is manual.
3. **Legal pages outstanding.** Privacy Policy and Terms of Service remain in legal
   review. This is disclosed in the footer and should be closed before broad campaign
   traffic.
4. **Capability matrix density.** `/status` now carries the full 45-row matrix. It is
   correct and complete, but a summary-then-expand pattern would serve non-specialist
   evaluators better.

## 7. Verdict

The site now communicates **confidence, maturity, and operational value** without
fabricating a single capability, certification, customer, performance figure, ROI number,
or deployment approval. Every constraint that was true before this work is still true and
still published. What changed is that a prospective enterprise customer can now find the
reason to start a conversation before they find the footnote about revision
`3c401504…` — which is the correct order, because only one of those two things is the
website's job.
