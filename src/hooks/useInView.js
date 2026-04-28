import { useEffect, useRef } from 'react'

export function useInView(className = 'in-view', options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [className])

  return ref
}

// Observe a parent and stagger children
export function useStagger(className = 'in-view', options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll('[data-stagger]')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add(className), i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [className])

  return ref
}
