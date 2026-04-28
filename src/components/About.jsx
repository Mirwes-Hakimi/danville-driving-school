import { useInView, useStagger } from '../hooks/useInView'

const features = [
  { icon: '📋', title: '30+ Years Combined Expertise', desc: 'Classroom staff with 30+ years of driving ed experience — they know the mistakes and how to fix them.' },
  { icon: '🪪', title: 'State-Licensed Instructors', desc: 'All BTW instructors hold CA state licenses with mandatory recertification every 3 years.' },
  { icon: '🚗', title: 'Dual-Control Vehicles', desc: 'Every training car has dual-control brakes and extra mirrors so instructors can intervene instantly.' },
  { icon: '📅', title: 'Flexible Scheduling', desc: 'Before/after school, evenings, weekends — we work around your life.' },
  { icon: '♿', title: 'All Learners Welcome', desc: 'We accommodate students with learning disabilities or physical impairments.' },
  { icon: '🏠', title: 'Pickup & Dropoff', desc: 'We serve 10+ cities — Danville, San Ramon, Walnut Creek, Lafayette, and more.' },
]

export default function About() {
  const textRef = useInView('in-view')
  const gridRef = useStagger()

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="reveal-left">
            <div className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">About Us</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">More Than Driving — We Build Responsibility</h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              Founded in 1989, Danville Driving School has spent over three decades preparing Bay Area teens and adults to be safe, confident drivers. We believe classroom instruction is irreplaceable — the give and take of a real class, where one student's question becomes everyone's answer, is what separates great drivers from just licensed ones.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Our instructors use supplemental films, testing materials, and decades of expertise to deliver what we call "3-dimensional learning" — going far beyond what any online-only course can provide.
            </p>
            <a href="tel:9258378235"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors no-underline">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call (925) 837-8235
            </a>
          </div>

          <div ref={gridRef} className="grid sm:grid-cols-2 gap-4">
            {features.map(f => (
              <div key={f.title} data-stagger className="reveal bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover-lift">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
