import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppData } from '../context/AppDataContext'
import { getUsers } from '../utils/storage'
import Logo from '../components/Logo'

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

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'schedule', label: 'Schedule', icon: '🗓' },
  { id: 'bookings', label: 'Bookings', icon: '📋' },
  { id: 'students', label: 'Students', icon: '👥' },
]

function StatusBadge({ status }) {
  const map = { pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-emerald-100 text-emerald-700', cancelled: 'bg-red-100 text-red-700' }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${map[status] || map.pending}`}>{status}</span>
}

function PaymentBadge({ method, paymentStatus }) {
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

function SlotForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    date: initial.date || '',
    time: initial.time || '',
    duration: initial.duration || 60,
    instructor: initial.instructor || '',
  })
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}
      className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Date *</label>
          <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Time *</label>
          <input type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Duration (min)</label>
          <select value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
            <option value={60}>60 min (1 hr)</option>
            <option value={90}>90 min (1.5 hr)</option>
            <option value={120}>120 min (2 hr)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Instructor</label>
          <input type="text" value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })}
            placeholder="Instructor name"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          {initial.id ? 'Save Changes' : 'Add Slot'}
        </button>
        <button type="button" onClick={onCancel}
          className="bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { slots, bookings, createSlot, deleteSlot, editSlot, changeBookingStatus } = useAppData()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [showAddSlot, setShowAddSlot] = useState(false)
  const [editingSlot, setEditingSlot] = useState(null)
  const [slotFilter, setSlotFilter] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const students = getUsers().filter(u => u.role === 'student')
  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const upcomingSlots = slots.filter(s => s.available && s.date >= new Date().toISOString().split('T')[0])

  function formatDate(dateStr) {
    return new Date(dateStr + 'T00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
  function formatTime(timeStr) {
    if (!timeStr) return timeStr
    if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr
    const [h, m] = timeStr.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const filteredSlots = slots
    .filter(s => !slotFilter || s.date === slotFilter)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top nav */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <Logo iconSize={32}/>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Admin</span>
          <button onClick={() => { logout(); navigate('/') }}
            className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors">
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-white rounded-xl border border-slate-200 p-1 mb-6 w-fit">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                tab === t.id ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}>
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: bookings.length, icon: '📋', color: 'bg-blue-50 text-blue-700' },
                { label: 'Pending', value: pendingBookings.length, icon: '⏳', color: 'bg-amber-50 text-amber-700' },
                { label: 'Students', value: students.length, icon: '👥', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Available Slots', value: upcomingSlots.length, icon: '🗓', color: 'bg-red-50 text-red-700' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2 ${s.color}`}>{s.icon}</div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                  <div className="text-slate-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">Recent Bookings</h3>
              {bookings.length === 0 ? <p className="text-slate-400 text-sm">No bookings yet.</p> : (
                <div className="space-y-2">
                  {[...bookings].reverse().slice(0, 5).map(b => (
                    <div key={b.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-sm gap-3 flex-wrap">
                      <div>
                        <span className="font-semibold text-slate-900">{b.studentName}</span>
                        <span className="text-slate-400 mx-2">·</span>
                        <span className="text-slate-600">{b.packageName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PaymentBadge method={b.paymentMethod} paymentStatus={b.paymentStatus} />
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule management */}
        {tab === 'schedule' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-xl font-bold text-slate-900">Manage Schedule</h2>
              <button onClick={() => { setShowAddSlot(true); setEditingSlot(null) }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                Add Time Slot
              </button>
            </div>

            {showAddSlot && !editingSlot && (
              <SlotForm
                onSave={data => { createSlot(data); setShowAddSlot(false) }}
                onCancel={() => setShowAddSlot(false)}
              />
            )}

            {/* Filter */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-600">Filter by date:</label>
              <input type="date" value={slotFilter} onChange={e => setSlotFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"/>
              {slotFilter && <button onClick={() => setSlotFilter('')} className="text-xs text-slate-400 hover:text-slate-600">Clear</button>}
              <span className="text-xs text-slate-400 ml-auto">{filteredSlots.length} slots</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Date</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Time</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden sm:table-cell">Duration</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden md:table-cell">Instructor</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSlots.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-slate-400 py-8 text-sm">No slots found.</td></tr>
                  ) : filteredSlots.map(slot => (
                    <tr key={slot.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800">{formatDate(slot.date)}</td>
                      <td className="px-4 py-3 text-slate-600">{formatTime(slot.time)}</td>
                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{slot.duration} min</td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{slot.instructor || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          slot.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {slot.available ? 'Available' : 'Booked'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => { setEditingSlot(slot); setShowAddSlot(false) }}
                            className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded" title="Edit">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                          </button>
                          {deleteConfirm === slot.id ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => { deleteSlot(slot.id); setDeleteConfirm(null) }}
                                className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-semibold">Yes</button>
                              <button onClick={() => setDeleteConfirm(null)}
                                className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">No</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(slot.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded" title="Delete">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          )}
                        </div>
                        {editingSlot?.id === slot.id && (
                          <div className="mt-2">
                            <SlotForm
                              initial={editingSlot}
                              onSave={data => { editSlot(slot.id, data); setEditingSlot(null) }}
                              onCancel={() => setEditingSlot(null)}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings */}
        {tab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">All Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-slate-400 text-sm">No bookings yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...bookings].reverse().map(b => (
                  <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div>
                        <h3 className="font-bold text-slate-900">{b.studentName}</h3>
                        <p className="text-slate-500 text-sm">{b.packageName} · ${b.total} · {new Date(b.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <PaymentBadge method={b.paymentMethod} paymentStatus={b.paymentStatus} />
                        <StatusBadge status={b.status} />
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => changeBookingStatus(b.id, 'confirmed')}
                              className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-2.5 py-1 rounded-full transition-colors">
                              Confirm
                            </button>
                            <button onClick={() => changeBookingStatus(b.id, 'cancelled')}
                              className="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-2.5 py-1 rounded-full transition-colors">
                              Cancel
                            </button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => changeBookingStatus(b.id, 'cancelled')}
                            className="text-xs bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 font-semibold px-2.5 py-1 rounded-full transition-colors">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                    {b.requestedSessions && b.requestedSessions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {b.requestedSessions.map((s, i) => (
                          <span key={i} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-1 rounded-lg">
                            Session {i + 1}: {formatDate(s.date)}
                            {s.startTime && ` · ${fmt12(s.startTime)} – ${fmt12(addHours(s.startTime, 2))}`}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-1">
                      {b.studentDOB && <span>DOB: <span className="font-medium text-slate-600">{b.studentDOB}</span></span>}
                      {b.notes && <span>Notes: <span className="italic text-slate-500">"{b.notes}"</span></span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Students */}
        {tab === 'students' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Registered Students ({students.length})</h2>
            {students.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <div className="text-4xl mb-2">👥</div>
                <p className="text-slate-400 text-sm">No students registered yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Name</th>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Email</th>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden sm:table-cell">Phone</th>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden md:table-cell">DOB</th>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden md:table-cell">Joined</th>
                      <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => {
                      const sBookings = bookings.filter(b => b.studentId === s.id)
                      return (
                        <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                                {s.name.charAt(0)}
                              </div>
                              <span className="font-medium text-slate-900">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{s.email}</td>
                          <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{s.phone || '—'}</td>
                          <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{s.dateOfBirth || '—'}</td>
                          <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{new Date(s.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{sBookings.length}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
