import { createContext, useContext, useState, useEffect } from 'react'
import {
  getSlots, saveSlots, addSlot, removeSlot, updateSlot,
  getBookings, addBooking, updateBooking,
  uid,
} from '../utils/storage'

const AppDataContext = createContext(null)

function seedSlots() {
  const existing = getSlots()
  if (existing.length > 0) return
  const slots = []
  const today = new Date()
  const instructors = ['Instructor Mike', 'Instructor Sarah', 'Instructor James']
  const times = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

  for (let d = 1; d <= 28; d++) {
    const date = new Date(today)
    date.setDate(today.getDate() + d)
    if (date.getDay() === 0) continue // skip Sundays (class days)
    const dateStr = date.toISOString().split('T')[0]
    const numSlots = Math.floor(Math.random() * 3) + 2
    const shuffled = [...times].sort(() => 0.5 - Math.random()).slice(0, numSlots)
    shuffled.forEach(time => {
      slots.push({
        id: uid(),
        date: dateStr,
        time,
        duration: 60,
        instructor: instructors[Math.floor(Math.random() * instructors.length)],
        available: true,
      })
    })
  }
  saveSlots(slots)
}

export function AppDataProvider({ children }) {
  const [slots, setSlots] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    seedSlots()
    refresh()
  }, [])

  function refresh() {
    setSlots(getSlots())
    setBookings(getBookings())
  }

  function createSlot(slotData) {
    const slot = { id: uid(), available: true, ...slotData }
    addSlot(slot)
    setSlots(getSlots())
    return slot
  }

  function deleteSlot(id) {
    removeSlot(id)
    setSlots(getSlots())
  }

  function editSlot(id, changes) {
    updateSlot(id, changes)
    setSlots(getSlots())
  }

  function createBooking(bookingData) {
    const booking = {
      id: uid(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...bookingData,
    }
    addBooking(booking)
    // Mark slots as unavailable
    if (bookingData.slotIds) {
      bookingData.slotIds.forEach(sid => updateSlot(sid, { available: false }))
      setSlots(getSlots())
    }
    setBookings(getBookings())
    return booking
  }

  function changeBookingStatus(id, status) {
    updateBooking(id, { status })
    setBookings(getBookings())
  }

  const availableSlots = slots.filter(s => s.available)

  return (
    <AppDataContext.Provider value={{
      slots, availableSlots, bookings,
      createSlot, deleteSlot, editSlot,
      createBooking, changeBookingStatus,
      refresh,
    }}>
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => useContext(AppDataContext)
