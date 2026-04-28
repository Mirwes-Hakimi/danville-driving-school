import { useState } from 'react'
import { useInView, useStagger } from '../hooks/useInView'

const FAQS = [
  {
    q: 'What age do students need to be to enroll?',
    a: 'Students can begin the online Driver Ed course at 15½. Behind-the-wheel lessons require a valid California learner\'s permit, which you can get after passing the DMV written knowledge test at 15½. Call us and we\'ll help you figure out the right time to start.',
  },
  {
    q: 'What do I need to get my California learner\'s permit?',
    a: 'You must be at least 15½, pass the DMV written knowledge test, and bring proof of identity, California residency, and your Social Security number. A parent or guardian must sign the application if you\'re under 18. We can help you prepare for the knowledge test.',
  },
  {
    q: 'Is pickup and dropoff included?',
    a: 'Yes — pickup and dropoff are included with all behind-the-wheel packages at no extra charge, within our service area: Danville, San Ramon, Alamo, Walnut Creek, Pleasanton, Dublin, and surrounding Tri-Valley communities.',
  },
  {
    q: 'What\'s the difference between the Full Bundle and the Confidence Builder?',
    a: 'The Full Bundle pairs our online Driver Ed course with the state-minimum 6 hours of behind-the-wheel instruction — everything required to get your license, bundled at a $35 savings. The Confidence Builder is for students who already have or don\'t need the classroom course but want 10 hours of driving practice to feel truly ready for the DMV test.',
  },
  {
    q: 'Do you teach adult and senior drivers?',
    a: 'Absolutely. We work with new adults who never learned to drive, recent transplants adjusting to California roads, and seniors who want to stay safe and independent. Lessons are tailored to your comfort level and experience — no judgment, just patient instruction.',
  },
  {
    q: 'Can I use your car for my DMV road test?',
    a: 'We do not currently provide vehicles for the DMV drive test. However, our instructors prepare you thoroughly so you can pass confidently using your family\'s vehicle. We\'ll make sure you know exactly what the examiner will be looking for.',
  },
  {
    q: 'What if I need to cancel or reschedule a lesson?',
    a: 'We ask for at least 24 hours\' notice to reschedule at no charge. Cancellations with less than 24 hours\' notice may be subject to a fee. Life happens — just contact us as soon as possible at (925) 837-8235 and we\'ll do our best to accommodate you.',
  },
  {
    q: 'How do I pay, and is there a payment plan?',
    a: 'We accept Visa, Mastercard, American Express, Discover, personal check, and cash. Payment is due at the time of enrollment. If you have questions about payment arrangements, please call our office and we\'ll work something out.',
  },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors">
        <span className="font-semibold text-slate-900 text-sm sm:text-base">{q}</span>
        <span className={`shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </span>
      </button>
      <div
        style={{ maxHeight: open ? '300px' : '0', transition: 'max-height 0.3s ease' }}
        className="overflow-hidden">
        <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const headRef = useInView()
  const listRef = useStagger()

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={headRef} className="reveal text-center mb-12">
          <div className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Common Questions</h2>
          <p className="text-slate-500 text-base">
            Can't find your answer? Call us at{' '}
            <a href="tel:9258378235" className="text-red-600 no-underline font-medium">(925) 837-8235</a>.
          </p>
        </div>

        <div ref={listRef} className="space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} data-stagger className="reveal">
              <Item q={item.q} a={item.a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
