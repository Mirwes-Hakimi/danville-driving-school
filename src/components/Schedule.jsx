import { useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function Schedule() {
  const ref = useInView()
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone / Email: ${form.contact}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@danvilledrivingschool.net?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition'

  return (
    <section id="message" className="py-20 bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="reveal text-center mb-10">
          <div className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Quick Message
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Have a Question?</h2>
          <p className="text-slate-400 text-base">
            Send us a message and we'll get back to you within a few hours. Or call/text us directly at{' '}
            <a href="tel:9258378235" className="text-red-400 no-underline font-medium">(925) 837-8235</a>.
          </p>
        </div>

        {sent ? (
          <div className="reveal in-view text-center bg-white/5 border border-white/10 rounded-2xl py-12 px-6">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-slate-400 text-sm mb-6">Your email client should have opened. We'll respond within a few hours.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', contact: '', message: '' }) }}
              className="text-sm text-red-400 hover:text-red-300 underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Your Name *</label>
                <input
                  type="text" required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={field + ' bg-white/5 text-white placeholder-slate-500 border-white/10 focus:border-red-500'}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone or Email *</label>
                <input
                  type="text" required
                  placeholder="(925) 555-0100 or jane@email.com"
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                  className={field + ' bg-white/5 text-white placeholder-slate-500 border-white/10 focus:border-red-500'}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Ask about packages, scheduling, locations, or anything else…"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className={field + ' bg-white/5 text-white placeholder-slate-500 border-white/10 focus:border-red-500 resize-none'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
