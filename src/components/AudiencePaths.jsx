import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, Building2, LogIn } from 'lucide-react'
import { LAUNCH_URL } from '../data/cloudRuntime'

/**
 * AudiencePaths — the three things a visitor can actually do, kept apart.
 *
 * Before this existed the site put "Launch FEUS" first on almost every page.
 * That is the right call for the small number of people whose organisation has
 * already granted them access, and a dead end for everyone else: the runtime is
 * behind Microsoft Entra sign-in, so a first-time visitor who clicks it lands on
 * a sign-in screen for a tenant they are not in, with nothing explaining why.
 *
 * Seeing the product, adopting the product, and using the product are three
 * different jobs with three different audiences. This component names all three
 * and says out loud what each one requires, so nobody has to discover the
 * access requirement by hitting a wall.
 */
export default function AudiencePaths({ className = '' }) {
  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-3">
        <PathCard
          icon={PlayCircle}
          eyebrow="Evaluating"
          title="See it working"
          body="A guided live Azure TST demo with Microsoft Foundry inference, synthetic inputs, authorized Entra access and agreed budgets. No customer connections. An offline fixture option is also available."
          action={<Link to="/demo" className="btn-primary inline-flex items-center justify-center gap-2 w-full">Request a demonstration<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          note="Arranged with you. Usually within one business week."
        />
        <PathCard
          icon={Building2}
          eyebrow="Adopting"
          title="Run it in your organisation"
          body="A scoped onboarding through identity, environments, connections, governance, budget policy, and validation before anything goes live."
          action={<Link to="/get-started" className="btn-primary inline-flex items-center justify-center gap-2 w-full">See the adoption path<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          note="Nine steps, shared between your team and ours."
        />
        <PathCard
          icon={LogIn}
          eyebrow="Already onboarded"
          title="Sign in"
          body="The browser workbench for people whose organisation has already granted them access."
          action={(
            <a
              href={LAUNCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2 w-full"
            >
              Sign in to FEUS
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          note="Requires a Microsoft Entra account your organisation has granted. Sign-in will not create one."
        />
      </div>
    </div>
  )
}

function PathCard({ icon: Icon, eyebrow, title, body, action, note }) {
  return (
    <div className="glass-card flex flex-col rounded-2xl p-6">
      <Icon className="h-6 w-6 text-accent-300" aria-hidden="true" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{body}</p>
      <div className="mt-6">{action}</div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">{note}</p>
    </div>
  )
}
