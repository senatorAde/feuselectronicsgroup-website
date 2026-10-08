import { useState } from 'react'
import { Link } from 'react-router-dom'
import { USE_CASE_STORIES } from '../data/commercialJourney'

export default function UseCaseStories() {
  const [selected, setSelected] = useState('sql')
  const [step, setStep] = useState(0)
  const story = USE_CASE_STORIES.find(item => item.id === selected)
  return <section className="commercial-story" aria-labelledby="story-title">
    <h2 id="story-title">Intent → Govern → Execute → Verify → Measure Value</h2>
    <p><strong>Illustrative walkthrough.</strong> These controls step through an example; they do not call a database, model or customer system.</p>
    <div className="commercial-story-choices" role="group" aria-label="Choose a use case">
      {USE_CASE_STORIES.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id}
        onClick={() => { setSelected(item.id); setStep(0) }}>{item.title}</button>)}
    </div>
    <p className="commercial-route">{story.route}</p>
    <ol className="commercial-story-steps" aria-label="Walkthrough stages">
      {['Intent', 'Govern', 'Execute', 'Verify', 'Measure Value'].map((label, index) =>
        <li key={label}><button type="button" aria-pressed={step === index} aria-controls="story-detail"
          onClick={() => setStep(index)}>{index + 1}. {label}</button></li>)}
    </ol>
    <div id="story-detail" className="commercial-story-detail" aria-live="polite" aria-atomic="true">
      <p>{story.steps[step]}</p>
    </div>
    <div className="commercial-story-controls">
      <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous stage</button>
      <button type="button" disabled={step === 4} onClick={() => setStep(step + 1)}>Next stage</button>
    </div>
    <p>No auto-play. Use the buttons with keyboard, touch or pointer. <Link to="/architecture">See the reference architecture</Link>.</p>
  </section>
}
