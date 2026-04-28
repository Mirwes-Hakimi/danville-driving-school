import { useInView, useStagger } from '../hooks/useInView'
import { useNavigate } from 'react-router-dom'

export const PACKAGES = [
  {
    id: 'pkg-2hr',
    icon: '🚗',
    name: 'BTW Training: 2 Hours',
    price: 180,
    tag: null,
    type: '2 Hours Behind the Wheel',
    sessions: 1,
    description: 'One focused session with a certified instructor at $90/hr.',
    features: [
      'Pick-up & drop-off included',
      'Start from parking lot or quiet area',
      'Primary driving rules explained',
      'Dual-control vehicle',
    ],
    highlight: false,
  },
  {
    id: 'pkg-4hr',
    icon: '⭐',
    name: 'BTW Training: 4 Hours',
    price: 360,
    tag: 'Most Popular',
    type: '4 Hours Behind the Wheel',
    sessions: 2,
    description: 'Split into two sessions on different days for steady skill-building.',
    features: [
      'Split into 2 sessions on different days',
      'Pick-up & drop-off included',
      'Primary & highway driving covered',
      'Comprehensive driving rules coverage',
    ],
    highlight: true,
  },
  {
    id: 'pkg-6hr',
    icon: '🏆',
    name: 'BTW Training: 6 Hours',
    price: 540,
    tag: 'Required for Teens',
    type: '6 Hours Behind the Wheel',
    sessions: 3,
    description: 'California requires 6 hours of professional BTW instruction before teens can take their DMV drive test.',
    features: [
      'CA state requirement for teens',
      'Split into 3 sessions on different days',
      'Pick-up & drop-off included',
      'Highway & residential driving',
    ],
    highlight: false,
  },
  {
    id: 'pkg-dmv',
    icon: '🎯',
    name: 'DMV Road Test Package',
    price: 250,
    tag: 'DMV',
    type: '2 Hours · DMV Test',
    sessions: 1,
    description: '45-minute warm-up drive before your DMV test in our certified vehicle.',
    features: [
      '45-min warm-up practice before test',
      'DMV road test appointment included',
      'Certified instructor guidance',
      'DMV-approved vehicle provided',
    ],
    highlight: false,
  },
]

const TAG_COLORS = {
  'Most Popular':      'bg-red-600',
  'Required for Teens':'bg-amber-600',
  'DMV':               'bg-blue-600',
}

export default function Pricing() {
  const headRef = useInView()
  const cardsRef = useStagger()
  const navigate = useNavigate()

  function handleSelect(pkg) {
    sessionStorage.setItem('selectedPackage', JSON.stringify(pkg))
    navigate('/signup?pkg=' + pkg.id)
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Simple, Transparent Packages</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            All packages include pick-up &amp; drop-off. No hidden fees — call us with any questions.
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} data-stagger
              className={`reveal flex flex-col rounded-2xl border-2 overflow-hidden hover-lift transition-all ${
                pkg.highlight ? 'border-red-500 shadow-xl shadow-red-100' : 'border-slate-200'
              }`}>
              {pkg.tag && (
                <div className={`text-center py-2 text-xs font-bold tracking-wide text-white ${TAG_COLORS[pkg.tag] || 'bg-slate-700'}`}>
                  {pkg.tag}
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-0.5 leading-snug">{pkg.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-3">{pkg.type}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-3xl font-bold text-slate-900">${pkg.price}</span>
                  <span className="text-slate-400 text-sm mb-1">/package</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{pkg.description}</p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelect(pkg)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    pkg.highlight
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-700 text-white'
                  }`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          Payment accepted via Visa, Mastercard, Amex, Discover, Check, or Cash.
          Call <a href="tel:9258378235" className="text-red-600 no-underline font-medium">(925) 837-8235</a> to enroll by phone.
        </p>
      </div>
    </section>
  )
}
