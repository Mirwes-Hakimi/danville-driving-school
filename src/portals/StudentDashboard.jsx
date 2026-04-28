import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppData } from '../context/AppDataContext'
import { PACKAGES } from '../components/Pricing'
import Logo from '../components/Logo'

// Replace these with your actual Stripe Payment Link URLs from the Stripe dashboard
const STRIPE_LINKS = {
  'pkg-2hr':    'https://buy.stripe.com/REPLACE_WITH_2HR_LINK',
  'pkg-4hr':    'https://buy.stripe.com/REPLACE_WITH_4HR_LINK',
  'pkg-6hr':    'https://buy.stripe.com/REPLACE_WITH_6HR_LINK',
  'pkg-dmv':    'https://buy.stripe.com/REPLACE_WITH_DMV_LINK',
}

function fmt12(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

function addHours(time24, hrs) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const total = h * 60 + m + hrs * 60
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export function fmtSessionTime(startTime) {
  if (!startTime) return ''
  return `${fmt12(startTime)} – ${fmt12(addHours(startTime, 2))}`
}

const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function NavBar({ user, logout }) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="no-underline">
        <Logo iconSize={32}/>
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-sm hidden sm:block">Hi, {user.name.split(' ')[0]}</span>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors">
          Sign out
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    pending:   'bg-amber-100 text-amber-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${map[status] || map.pending}`}>{status}</span>
}

function PaymentBadge({ method }) {
  if (!method) return null
  if (method === 'stripe') return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg>
      Stripe · Paid
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Invoice Sent
    </span>
  )
}

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const { bookings, createBooking } = useAppData()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [tab, setTab] = useState('bookings')
  // 1=pick package, 2=booking form, 3=payment, 4=done
  const [step, setStep] = useState(1)
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [sessions, setSessions] = useState([])   // [{date, timePreference}]
  const [studentDOB, setStudentDOB] = useState(user.dateOfBirth || '')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(null)

  useEffect(() => {
    const pkgId = params.get('book')
    if (pkgId) {
      const pkg = PACKAGES.find(p => p.id === pkgId)
      if (pkg) { selectPackage(pkg); setTab('book') }
    }
  }, [params])

  const myBookings = bookings.filter(b => b.studentId === user.id)

  function selectPackage(pkg) {
    setSelectedPkg(pkg)
    setSessions(Array.from({ length: pkg.sessions }, () => ({ date: '', startTime: '' })))
    setStep(2)
  }

  function updateSession(i, field, value) {
    setSessions(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
  }

  const canContinue = sessions.every(s => s.date && s.startTime) && studentDOB

  function buildBookingPayload(method) {
    return {
      studentId: user.id,
      studentName: user.name,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      requestedSessions: sessions,
      studentDOB,
      notes,
      total: selectedPkg.price,
      paymentMethod: method,
      paymentStatus: method === 'stripe' ? 'paid' : 'invoiced',
      slotIds: [],
      slots: [],
    }
  }

  function handlePayNow() {
    window.open(STRIPE_LINKS[selectedPkg.id], '_blank')
    createBooking(buildBookingPayload('stripe'))
    setPaymentMethod('stripe')
    setStep(4)
  }

  function handlePayLater() {
    createBooking(buildBookingPayload('invoice'))
    setPaymentMethod('invoice')
    setStep(4)
  }

  function resetBook() {
    setStep(1); setSelectedPkg(null); setSessions([]); setNotes(''); setPaymentMethod(null)
  }

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: '📋' },
    { id: 'book',     label: 'Book a Lesson', icon: '➕' },
    { id: 'profile',  label: 'Profile', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar user={user} logout={() => { logout(); navigate('/') }} />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 mb-6 w-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                tab === t.id ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}>
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── My Bookings ── */}
        {tab === 'bookings' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">My Bookings</h2>
            {myBookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <div className="text-5xl mb-3">📅</div>
                <p className="text-slate-500 mb-4">No bookings yet.</p>
                <button onClick={() => setTab('book')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  Book Your First Lesson
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myBookings.map(b => (
                  <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div>
                        <h3 className="font-bold text-slate-900">{b.packageName}</h3>
                        <p className="text-slate-500 text-sm">${b.total} · Booked {new Date(b.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={b.status} />
                        <PaymentBadge method={b.paymentMethod} />
                      </div>
                    </div>

                    {b.requestedSessions && b.requestedSessions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {b.requestedSessions.map((s, i) => (
                          <span key={i} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-1 rounded-lg">
                            Session {i + 1}: {new Date(s.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            {s.startTime && ` · ${fmt12(s.startTime)} – ${fmt12(addHours(s.startTime, 2))}`}
                          </span>
                        ))}
                      </div>
                    )}

                    {b.notes && (
                      <p className="text-xs text-slate-400 italic mt-1">"{b.notes}"</p>
                    )}

                    {b.paymentMethod === 'invoice' && (
                      <p className="text-xs text-blue-600 mt-3 bg-blue-50 rounded-lg px-3 py-2">
                        A QuickBooks invoice has been sent to <strong>{user.email}</strong>. Please pay within 7 days to confirm your sessions.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Book a Lesson ── */}
        {tab === 'book' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Book a Lesson</h2>

            {/* Step 1 – pick package */}
            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {PACKAGES.map(pkg => (
                  <button key={pkg.id} onClick={() => selectPackage(pkg)}
                    className="text-left bg-white rounded-2xl border-2 border-slate-200 hover:border-red-500 p-5 transition-all hover-lift">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-2xl">{pkg.icon}</span>
                      {pkg.tag && (
                        <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${
                          pkg.tag === 'Most Popular' ? 'bg-red-600' :
                          pkg.tag === 'Best Value'   ? 'bg-emerald-600' :
                          pkg.tag === 'DMV'          ? 'bg-blue-600' : 'bg-slate-600'
                        }`}>{pkg.tag}</span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{pkg.name}</div>
                    <div className="text-slate-400 text-xs mb-2">{pkg.type}</div>
                    <div className="text-2xl font-bold text-red-600">${pkg.price}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 – booking request form */}
            {step === 2 && selectedPkg && (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-700 text-sm">← Back</button>
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 flex items-center gap-2">
                    <span>{selectedPkg.icon}</span>
                    <span className="text-red-700 font-semibold text-sm">{selectedPkg.name} — ${selectedPkg.price}</span>
                  </div>
                </div>

                {/* Session date/time pickers */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h3 className="font-bold text-slate-900">
                    Preferred Session Date{sessions.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-slate-400 text-xs -mt-2">We'll do our best to accommodate your preferences. Our team will confirm exact times within 24–48 hours.</p>

                  {sessions.map((s, i) => (
                    <div key={i} className="space-y-2">
                      {sessions.length > 1 && (
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Session {i + 1}</p>
                      )}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            required
                            min={tomorrow()}
                            value={s.date}
                            onChange={e => updateSession(i, 'date', e.target.value)}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Start Time * <span className="font-normal text-slate-400">(2 hrs/session)</span>
                          </label>
                          <input
                            type="time"
                            required
                            min="08:00"
                            max="17:00"
                            value={s.startTime}
                            onChange={e => updateSession(i, 'startTime', e.target.value)}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          />
                          {s.startTime && (
                            <p className="text-xs text-slate-400 mt-1">
                              Session: {fmt12(s.startTime)} – {fmt12(addHours(s.startTime, 2))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DOB + Notes */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h3 className="font-bold text-slate-900">About You</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      max={new Date().toISOString().split('T')[0]}
                      value={studentDOB}
                      onChange={e => setStudentDOB(e.target.value)}
                      className="w-full sm:w-64 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Additional Notes <span className="font-normal text-slate-400">(optional)</span></label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Anything we should know? (e.g. specific areas to practice, schedule restrictions…)"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={!canContinue}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                  Continue to Payment — ${selectedPkg.price}
                </button>
              </div>
            )}

            {/* Step 3 – payment choice */}
            {step === 3 && selectedPkg && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep(2)}
                    className="text-slate-400 hover:text-slate-700 text-sm">← Back</button>
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 flex items-center gap-2">
                    <span>{selectedPkg.icon}</span>
                    <span className="text-red-700 font-semibold text-sm">{selectedPkg.name} — ${selectedPkg.price}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-1">How would you like to pay?</h3>
                <p className="text-slate-400 text-sm mb-5">Your booking is held until payment is received or an invoice is issued.</p>

                <div className="space-y-3">
                  <button onClick={handlePayNow}
                    className="w-full text-left bg-white border-2 border-slate-200 hover:border-violet-500 rounded-2xl p-5 transition-all hover-lift group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900">Pay Now with Card</p>
                        <p className="text-slate-500 text-sm">Secure Stripe checkout — Visa, Mastercard, Amex, Discover</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900">${selectedPkg.price}</p>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button onClick={handlePayLater}
                    className="w-full text-left bg-white border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-5 transition-all hover-lift group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900">Pay Later — Invoice</p>
                        <p className="text-slate-500 text-sm">We'll email you a QuickBooks invoice within 1 business day. Payment due within 7 days.</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-5">
                  Questions? Call <a href="tel:9258378235" className="text-red-600 no-underline font-medium">(925) 837-8235</a>
                </p>
              </div>
            )}

            {/* Step 4 – confirmation */}
            {step === 4 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 px-6">
                <div className="text-6xl mb-4">{paymentMethod === 'stripe' ? '✅' : '📄'}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {paymentMethod === 'stripe' ? 'Payment Received!' : 'Booking Submitted!'}
                </h3>
                <p className="text-slate-500 mb-1 max-w-sm mx-auto text-sm">
                  {paymentMethod === 'stripe'
                    ? "Payment confirmed via Stripe. We'll reach out within 24–48 hours to confirm your session times."
                    : `A QuickBooks invoice for $${selectedPkg?.price} will be emailed to ${user.email} within 1 business day. Please pay within 7 days.`}
                </p>
                <p className="text-slate-400 text-xs mb-6">
                  Questions? Call <a href="tel:9258378235" className="text-red-600 no-underline font-medium">(925) 837-8235</a>
                </p>
                <div className="flex flex-col items-center gap-3">
                  <button onClick={() => setTab('bookings')}
                    className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                    View My Bookings
                  </button>
                  <button onClick={resetBook} className="text-sm text-slate-400 hover:text-slate-600 underline">
                    Book another lesson
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Profile ── */}
        {tab === 'profile' && (
          <div className="max-w-md">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Profile</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-slate-500 text-sm">{user.email}</p>
                </div>
              </div>
              {[
                { label: 'Email',         value: user.email },
                { label: 'Phone',         value: user.phone || 'Not provided' },
                { label: 'Date of Birth', value: user.dateOfBirth || 'Not provided' },
                { label: 'Member since',  value: new Date(user.createdAt || Date.now()).toLocaleDateString() },
              ].map(f => (
                <div key={f.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{f.label}</span>
                  <span className="font-medium text-slate-900">{f.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              To update your info, call <a href="tel:9258378235" className="text-red-600 no-underline">(925) 837-8235</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
