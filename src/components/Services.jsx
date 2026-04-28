import { useInView, useStagger } from '../hooks/useInView'

const services = [
  {
    icon: '🎓',
    title: 'Teen Driving Lessons',
    description: 'Flexible scheduling around school — before/after, evenings, and weekends. Both male and female instructors available.',
    features: ['Pickup & dropoff from home', '6-hour state-required package', 'Dual-control brakes', 'Lessons after permit obtained'],
    color: 'blue',
  },
  {
    icon: '🚘',
    title: 'Adult Lessons',
    description: "Never too late to learn. Whether first-time or brushing up after years away from the wheel.",
    features: ['No age restrictions', 'Patient instructors', 'Flexible scheduling', 'Customized to your level'],
    color: 'red',
  },
  {
    icon: '👴',
    title: 'Senior Services',
    description: 'Specialized programs designed for seniors including refresher courses with licensed professionals.',
    features: ['Refresher course options', 'Calm, patient instructors', 'Adaptive techniques', 'Confidence-building'],
    color: 'green',
  },
  {
    icon: '📚',
    title: 'Driver Education',
    description: 'Our 4-day classroom program prepares teens (15½+) for the DMV permit test. Four classes monthly every Sunday.',
    features: ['4 consecutive Sundays', 'Film viewing & note-taking', 'DMV permit prep', 'Online option available'],
    color: 'purple',
  },
]

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-700',     border: 'border-blue-100' },
  red:    { bg: 'bg-red-50',    icon: 'bg-red-100 text-red-700',       border: 'border-red-100'  },
  green:  { bg: 'bg-emerald-50',icon: 'bg-emerald-100 text-emerald-700',border: 'border-emerald-100' },
  purple: { bg: 'bg-violet-50', icon: 'bg-violet-100 text-violet-700', border: 'border-violet-100' },
}

export default function Services() {
  const headRef = useInView()
  const cardsRef = useStagger()

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Our Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Driving Education for Every Stage</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">From first-time teens to returning adults — we have a program for you.</p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => {
            const c = colorMap[s.color]
            return (
              <div key={s.title} data-stagger
                className={`reveal ${c.bg} border ${c.border} rounded-2xl p-6 flex flex-col hover-lift`}>
                <div className={`${c.icon} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
                <ul className="space-y-1.5">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <a href="#pricing"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors no-underline">
            View Pricing & Packages
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
