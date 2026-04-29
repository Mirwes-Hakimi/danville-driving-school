import { useState, useEffect } from 'react'

const CARS = [
  { src: '/cars/car1.png', label: 'Toyota Corolla', type: 'Sedan' },
  { src: '/cars/car2.png', label: 'Toyota Corolla', type: 'Sedan' },
  { src: '/cars/car3.png', label: 'Toyota RAV4', type: 'SUV' },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive(i => (i + 1) % CARS.length)
      setAnimKey(k => k + 1)
    }, 3800)
    return () => clearInterval(t)
  }, [])

  function goTo(i) {
    setActive(i)
    setAnimKey(k => k + 1)
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="flex items-center gap-10 xl:gap-16">

          {/* Left — text content */}
          <div className="flex-1 min-w-0">
            <div className="hero-fade inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              Established 1989 — Serving the Bay Area
            </div>

            <h1 className="hero-fade-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Building Safe, Confident Drivers
              <span className="block text-red-500 mt-1">Since 1989</span>
            </h1>

            <p className="hero-fade-3 text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Professional driving education for teens, adults, and seniors in Danville, CA.
              State-licensed instructors, dual-control vehicles, and over $3M in insurance coverage.
            </p>

            <div className="hero-fade-4 flex flex-col sm:flex-row gap-3 mb-12">
              <a href="#pricing"
                className="pulse-cta bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg no-underline text-center">
                Packages
              </a>
            </div>

            <div className="hero-fade-4 flex flex-wrap gap-6">
              {[
                { icon: '🏆', text: '35+ Years Experience' },
                { icon: '🛡️', text: '$3M+ Insurance Coverage' },
                { icon: '🎓', text: 'State-Licensed Instructors' },
                { icon: '📍', text: 'Danville, CA' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 text-slate-300">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — car carousel */}
          <div className="hidden lg:flex flex-col items-center gap-4 w-[480px] xl:w-[540px] shrink-0 hero-fade-3">
            {/* Car image frame */}
            <div className="relative w-full animate-float">
              {/* Glow behind the card */}
              <div className="absolute inset-0 rounded-3xl bg-red-600/10 blur-2xl scale-95" />

              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-sm shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {CARS.map((car, i) => (
                    <img
                      key={i}
                      src={car.src}
                      alt={car.label}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ opacity: i === active ? 1 : 0 }}
                    />
                  ))}
                  {/* Active car enter animation overlay (invisible, just triggers reflow) */}
                  <div key={animKey} className="car-enter absolute inset-0 pointer-events-none" />
                </div>

                {/* Bottom label bar */}
                <div className="px-5 py-3 flex items-center justify-between bg-slate-900/80 border-t border-white/10">
                  <div>
                    <p className="text-white font-semibold text-sm">{CARS[active].label}</p>
                    <p className="text-slate-400 text-xs">Dual-control brakes · Safety mirrors</p>
                  </div>
                  <span className="bg-red-600/20 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-500/20">
                    {CARS[active].type}
                  </span>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {CARS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'bg-red-500 w-6 h-2'
                      : 'bg-white/25 hover:bg-white/50 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  )
}
