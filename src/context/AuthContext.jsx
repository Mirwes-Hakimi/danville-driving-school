import { createContext, useContext, useEffect, useState } from 'react'
import {
  getSession, setSession, clearSession,
  getUserByEmail, addUser,
  hashPw, checkPw,
  getUsers, saveUsers, uid,
} from '../utils/storage'

const AuthContext = createContext(null)

function seedAdmin() {
  const users = getUsers()
  if (!users.find(u => u.role === 'admin')) {
    saveUsers([
      ...users,
      {
        id: 'admin-001',
        name: 'Admin',
        email: 'admin@danvilledrivingschool.net',
        password: hashPw('DDS2024!'),
        phone: '(925) 837-8235',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ])
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession())

  useEffect(() => { seedAdmin() }, [])

  function login(email, password) {
    const found = getUserByEmail(email)
    if (!found) return { error: 'No account found with that email.' }
    if (!checkPw(password, found.password)) return { error: 'Incorrect password.' }
    const { password: _, ...safeUser } = found
    setSession(safeUser)
    setUser(safeUser)
    return { user: safeUser }
  }

  function signup({ name, email, password, phone, dateOfBirth }) {
    if (getUserByEmail(email)) return { error: 'An account with this email already exists.' }
    const newUser = {
      id: uid(),
      name,
      email,
      password: hashPw(password),
      phone: phone || '',
      dateOfBirth: dateOfBirth || '',
      role: 'student',
      createdAt: new Date().toISOString(),
    }
    addUser(newUser)
    const { password: _, ...safeUser } = newUser
    setSession(safeUser)
    setUser(safeUser)
    return { user: safeUser }
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
