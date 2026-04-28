import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Inquiry from ${form.name} — ${form.program || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProgram: ${form.program}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@danvilledrivingschool.net?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-block bg-blue-100 text-blue-800 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Call us, stop by, or fill out the form and we'll get back to you within 24–48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Location</h3>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">103 Town &amp; Country Drive</p>
                  <p className="text-slate-500 text-sm">Suite L, Danville, CA 94526</p>
                  <a href="https://maps.google.com/?q=103+Town+Country+Drive+Suite+L+Danville+CA+94526"
                    target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 text-xs font-medium hover:underline mt-1 inline-block no-underline">
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Phone</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <a href="tel:9258378235" className="font-semibold text-slate-800 text-base no-underline hover:text-blue-700">
                    (925) 837-8235
                  </a>
                  <p className="text-slate-400 text-xs">Responses within 24–48 hrs</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Office Hours</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Monday – Friday</span>
                  <span className="font-medium text-slate-800">10:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Saturday – Sunday</span>
                  <span className="text-slate-400">Closed</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-400">
                A drop box is outside the front entrance for after-hours forms.
              </div>
            </div>

            {/* Payments */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Amex', 'Discover', 'Check', 'Cash'].map(p => (
                  <span key={p} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">{p}</span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-2">Call to enroll by phone with card.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Opening your email app…</h3>
                  <p className="text-slate-500 text-sm">If it didn't open, call us directly at <a href="tel:9258378235" className="text-blue-600 font-semibold no-underline">(925) 837-8235</a></p>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange}
                          placeholder="jane@email.com"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="(925) 555-0100"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Program of Interest</label>
                        <select name="program" value={form.program} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                          <option value="">Select a program</option>
                          <option>Teen Driving Lessons</option>
                          <option>Adult Lessons</option>
                          <option>Senior Services</option>
                          <option>Driver Education (Classroom)</option>
                          <option>Online Driver Education</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message</label>
                      <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                        placeholder="Any questions or details about scheduling…"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"/>
                    </div>
                    <button type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                      Send Message
                    </button>
                    <p className="text-slate-400 text-xs text-center">
                      Or call us directly at <a href="tel:9258378235" className="text-blue-600 font-medium no-underline">(925) 837-8235</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
