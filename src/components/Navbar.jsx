import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Programs',  href: '/#services' },
    { label: 'Pricing',   href: '/#pricing' },
    { label: 'Fleet',     href: '/#fleet' },
    { label: 'Reviews',   href: '/#reviews' },
    { label: 'FAQ',       href: '/#faq' },
    { label: 'Contact',   href: '/#contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        {/* Red top accent line */}
        <div className="h-0.5 bg-linear-to-r from-red-700 via-red-500 to-red-700"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="no-underline shrink-0">
              <Logo iconSize={40}/>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <a key={l.href} href={l.href}
                  className="relative px-3 py-2 text-slate-600 hover:text-red-600 font-medium text-sm transition-colors no-underline group">
                  {l.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"/>
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:9258378235"
                className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm no-underline hover:text-red-600 transition-colors border border-slate-200 hover:border-red-300 px-3 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                (925) 837-8235
              </a>

              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/student'}
                  className="bg-slate-900 hover:bg-slate-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors no-underline">
                  {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                </Link>
              ) : (
                <>
                  <Link to="/login"
                    className="text-slate-700 hover:text-red-600 font-semibold text-sm transition-colors no-underline">
                    Sign In
                  </Link>
                  <Link to="/signup"
                    className="relative overflow-hidden bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-red-200 hover:shadow-md no-underline">
                    Book Now
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button className="lg:hidden p-2 text-slate-700 hover:text-red-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <div className="w-5 flex flex-col gap-1.5 relative h-4">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="bg-white border-t border-slate-100 px-4 py-4">
            <div className="flex flex-col gap-0.5 mb-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-slate-700 hover:text-red-600 font-medium py-2.5 px-3 rounded-xl hover:bg-red-50 transition-colors no-underline flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-red-400"/>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
              <a href="tel:9258378235"
                className="flex items-center justify-center gap-2 text-slate-700 font-semibold text-sm py-2.5 rounded-xl border border-slate-200 no-underline">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                (925) 837-8235
              </a>
              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/student'} onClick={() => setMenuOpen(false)}
                  className="bg-slate-900 text-white font-semibold text-center py-2.5 rounded-xl no-underline block text-sm">
                  {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="text-slate-700 font-semibold text-center py-2.5 rounded-xl border border-slate-200 no-underline block text-sm">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}
                    className="bg-linear-to-r from-red-600 to-red-500 text-white font-bold text-center py-3 rounded-xl no-underline block text-sm">
                    Book Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky mobile Book Now */}
      {isLanding && !user && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <Link to="/signup"
            className="block bg-linear-to-r from-red-600 to-red-500 text-white font-bold text-center py-3.5 rounded-xl no-underline transition-colors text-sm">
            Book Now — Starting at $180
          </Link>
        </div>
      )}
    </>
  )
}
