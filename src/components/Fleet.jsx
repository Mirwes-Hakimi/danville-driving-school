import { useInView, useStagger } from '../hooks/useInView'

const cars = [
  { src: '/cars/car1.png', name: 'Toyota Corolla', note: 'Dual-control brakes · Safety mirrors', type: 'Sedan' },
  { src: '/cars/car2.png', name: 'Toyota Corolla', note: 'Dual-control brakes · Safety mirrors', type: 'Sedan' },
  { src: '/cars/car3.png', name: 'Toyota RAV4', note: 'Dual-control brakes · Safety mirrors', type: 'SUV' },
]

const features = [
  { icon: '🦺', label: 'Dual-Control Brakes' },
  { icon: '🪞', label: 'Extra Safety Mirrors' },
  { icon: '🛡️', label: '$3M+ Insurance' },
  { icon: '🔧', label: 'Regularly Maintained' },
]

function CarPlaceholder({ name }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/5">
      <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14 opacity-20">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
        <circle cx="7.5" cy="14.5" r="1.5"/>
        <circle cx="16.5" cy="14.5" r="1.5"/>
      </svg>
      <p className="text-white/30 text-xs">{name}</p>
    </div>
  )
}

export default function Fleet() {
  const headRef = useInView()
  const carsRef = useStagger()

  return (
    <section id="fleet" className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headRef} className="reveal text-center mb-12">
          <div className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Our Fleet
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Safe, Modern Training Vehicles</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Every vehicle is equipped with dual-control brakes and extra safety mirrors — your safety is our top priority.
          </p>
        </div>

        <div ref={carsRef} className="grid sm:grid-cols-3 gap-5 mb-10">
          {cars.map((c, i) => (
            <div key={i} data-stagger
              className="reveal rounded-2xl overflow-hidden border border-white/10 bg-white/5 group hover-lift">
              <div className="aspect-video bg-slate-900 overflow-hidden relative">
                <img
                  src={c.src}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full absolute inset-0 hidden items-center justify-center flex-col gap-2 bg-slate-900">
                  <CarPlaceholder name={c.name} />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{c.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.note}</p>
                </div>
                <span className="bg-red-600/20 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-500/20">
                  {c.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {features.map(f => (
            <div key={f.label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="text-lg">{f.icon}</span>
              <span className="text-white font-medium text-sm">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
