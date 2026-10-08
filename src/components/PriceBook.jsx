import { Link } from 'react-router-dom'
import { CalendlyButton } from './CalendlyEmbed'
import {
  ADD_ONS,
  MODEL_CLASSES,
  PLATFORM_PLANS,
  PRICING_NOTES,
  SERVICE_PACKAGES,
  USAGE_TERMS,
} from '../data/platformPricing'

/** FEUS.ai published price book: plans, model usage classes, add-ons and services. */
export default function PriceBook() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="text-2xl font-bold text-white">Platform plans</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {PLATFORM_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`glass-card rounded-2xl p-6 flex flex-col ${plan.highlight ? 'border border-feus-400/50' : ''}`}
            >
              {plan.badge && (
                <span className="self-start rounded-full bg-feus-400/10 px-3 py-1 text-xs font-bold text-feus-200">
                  {plan.badge}
                </span>
              )}
              <h3 className="mt-3 text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400"> {plan.period}</span>}
              </p>
              <p className="mt-3 text-sm text-gray-300">{plan.summary}</p>
              <p className="mt-4 text-sm font-semibold text-feus-200">
                Models: {plan.modelClasses.join(' · ')}
              </p>
              <p className="text-sm text-gray-300">Included: {plan.includedUsage}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc list-inside flex-1">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.id === 'enterprise' ? (
                  <Link to="/contact?type=packages#contact-form" className="btn-secondary">{plan.cta}</Link>
                ) : (
                  <CalendlyButton>{plan.cta}</CalendlyButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="usage-heading">
        <h2 id="usage-heading" className="text-2xl font-bold text-white">Model usage classes</h2>
        <p className="mt-3 text-gray-300">
          Each plan includes a monthly model usage allowance. Your plan sets which model classes
          your organization can use.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <caption className="sr-only">Model usage classes and the models in each class</caption>
            <thead className="text-white">
              <tr>
                <th scope="col" className="py-2 pr-4">Class</th>
                <th scope="col" className="py-2 pr-4">Models</th>
                <th scope="col" className="py-2">Best for</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_CLASSES.map((modelClass) => (
                <tr key={modelClass.name} className="border-t border-white/10">
                  <th scope="row" className="py-3 pr-4 font-semibold text-white">{modelClass.name}</th>
                  <td className="py-3 pr-4">{modelClass.models}</td>
                  <td className="py-3">{modelClass.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 space-y-2 text-sm text-gray-300 list-disc list-inside">
          {USAGE_TERMS.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="addons-heading">
        <h2 id="addons-heading" className="text-2xl font-bold text-white">Add-ons</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ADD_ONS.map((addOn) => (
            <article key={addOn.name} className="glass-card rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-white">{addOn.name}</h3>
                <span className="text-sm font-semibold text-feus-200">{addOn.price}</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">{addOn.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-2xl font-bold text-white">Service packages</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {SERVICE_PACKAGES.map((service) => (
            <article key={service.name} className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white">{service.name}</h3>
              <p className="mt-1 text-sm font-semibold text-feus-200">
                {service.price} · {service.duration}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-300 list-disc list-inside">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Pricing terms">
        <ul className="space-y-2 text-sm text-gray-400">
          {PRICING_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
