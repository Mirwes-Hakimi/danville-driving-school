import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const STUDENT_TPL = import.meta.env.VITE_EMAILJS_STUDENT_TEMPLATE_ID
const SCHOOL_TPL  = import.meta.env.VITE_EMAILJS_SCHOOL_TEMPLATE_ID

// Sent to the new student
export async function sendStudentWelcome({ name, email }) {
  return emailjs.send(SERVICE_ID, STUDENT_TPL, {
    to_name:  name,
    to_email: email,
    school_phone: '(925) 837-8235',
    school_email: 'mirwes210@gmail.com',
  }, PUBLIC_KEY)
}

// Sent to the school when a new student signs up
export async function sendSchoolNotification({ name, email, phone, dateOfBirth }) {
  return emailjs.send(SERVICE_ID, SCHOOL_TPL, {
    to_email:      'mirwes210@gmail.com',
    student_name:  name,
    student_email: email,
    student_phone: phone || 'Not provided',
    student_dob:   dateOfBirth || 'Not provided',
  }, PUBLIC_KEY)
}
