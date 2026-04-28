const KEY = {
  users: 'dds_users',
  slots: 'dds_slots',
  bookings: 'dds_bookings',
  session: 'dds_session',
}

// Simple password obfuscation (not cryptographic — real auth needs a backend)
export const hashPw = pw => btoa(pw + ':dds2024')
export const checkPw = (pw, hash) => hashPw(pw) === hash

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

// --- Users ---
export function getUsers() { return load(KEY.users) || [] }
export function saveUsers(users) { save(KEY.users, users) }
export function getUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
}
export function addUser(user) {
  const users = getUsers()
  users.push(user)
  saveUsers(users)
}

// --- Session ---
export function getSession() { return load(KEY.session) }
export function setSession(user) { save(KEY.session, user) }
export function clearSession() { localStorage.removeItem(KEY.session) }

// --- Slots ---
export function getSlots() { return load(KEY.slots) || [] }
export function saveSlots(slots) { save(KEY.slots, slots) }
export function addSlot(slot) {
  const slots = getSlots()
  slots.push(slot)
  saveSlots(slots)
}
export function removeSlot(id) {
  saveSlots(getSlots().filter(s => s.id !== id))
}
export function updateSlot(id, changes) {
  saveSlots(getSlots().map(s => s.id === id ? { ...s, ...changes } : s))
}

// --- Bookings ---
export function getBookings() { return load(KEY.bookings) || [] }
export function saveBookings(bk) { save(KEY.bookings, bk) }
export function addBooking(booking) {
  const bk = getBookings()
  bk.push(booking)
  saveBookings(bk)
}
export function updateBooking(id, changes) {
  saveBookings(getBookings().map(b => b.id === id ? { ...b, ...changes } : b))
}
export function getBookingsByStudent(studentId) {
  return getBookings().filter(b => b.studentId === studentId)
}

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
