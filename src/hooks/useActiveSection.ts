import { useEffect, useState } from 'react'

export function useActiveSection(navigation: { id: string }[]) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const offset = Math.min(window.innerHeight * 0.3, 220)
      let current = 'home'
      for (const item of navigation) {
        const section = document.getElementById(item.id)
        if (section && section.getBoundingClientRect().top <= offset) current = item.id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        current = 'contact'
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [navigation])

  return active
}
