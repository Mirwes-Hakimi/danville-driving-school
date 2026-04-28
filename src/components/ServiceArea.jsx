const cities = [
  'Alamo', 'Danville', 'San Ramon', 'Walnut Creek',
  'Lafayette', 'Moraga', 'Orinda', 'Pleasant Hill',
  'Concord', 'Dublin',
]

export default function ServiceArea() {
  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Pickup &amp; Dropoff Available In
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {cities.map(city => (
            <span key={city}
              className="bg-slate-50 border border-slate-200 text-slate-600 text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {city}
            </span>
          ))}
        </div>
        <p className="text-slate-400 text-xs mt-3">Out-of-area arrangements available — just ask!</p>
      </div>
    </section>
  )
}
