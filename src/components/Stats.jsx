import { useStagger } from '../hooks/useInView'

const stats = [
  { value: '35+', label: 'Years Serving the Bay Area', icon: '🏆' },
  { value: '6+', label: 'Hours State-Required Instruction', icon: '🚗' },
  { value: '$3M+', label: 'Insurance Coverage', icon: '🛡️' },
  { value: '10+', label: 'Cities We Serve', icon: '📍' },
]

export default function Stats() {
  const ref = useStagger()
  return (
    <section className="bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} data-stagger className="reveal text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-bold text-red-500 mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
