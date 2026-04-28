import Logo from './Logo'

export default function Footer() {
  const links = {
    Programs: [
      { label: 'Teen Driving Lessons', href: '#services' },
      { label: 'Adult Lessons', href: '#services' },
      { label: 'Senior Services', href: '#services' },
      { label: 'Driver Education', href: '#services' },
      { label: 'Online Program', href: '#schedule' },
    ],
    Resources: [
      { label: 'Reviews', href: '#reviews' },
      { label: 'Our Fleet', href: '#fleet' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact Us', href: '#contact' },
    ],
  }

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <Logo theme="dark" iconSize={42}/>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Serving Danville and the greater Tri-Valley area since 1989. Building safe, confident drivers — one lesson at a time.
            </p>
            <a href="tel:9258378235"
              className="flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors no-underline mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              (925) 837-8235
            </a>
            <a href="mailto:info@danvilledrivingschool.net"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors no-underline">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              info@danvilledrivingschool.net
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-3">{group}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.label}>
                    <a href={item.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors no-underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Visit Us</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white text-xs font-semibold uppercase tracking-wide mb-1">Address</p>
                <p>103 Town &amp; Country Drive</p>
                <p>Suite L, Danville, CA 94526</p>
              </div>
              <div>
                <p className="text-white text-xs font-semibold uppercase tracking-wide mb-1">Office Hours</p>
                <p>Mon – Fri: 10 AM – 5 PM</p>
                <p>Sat: By appointment</p>
                <p>Sun: Closed</p>
              </div>
              <div>
                <p className="text-white text-xs font-semibold uppercase tracking-wide mb-1">Payment</p>
                <p>Visa, MC, Amex, Discover</p>
                <p>Check &amp; Cash accepted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} Danville Driving School. All rights reserved.</p>
          <p className="text-slate-600">Est. 1989 · CA OL# 6334 · Licensed by the California DMV</p>
        </div>
      </div>
    </footer>
  )
}
