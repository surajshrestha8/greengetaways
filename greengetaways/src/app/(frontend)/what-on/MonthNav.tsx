'use client'

import { useEffect, useState } from 'react'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

interface MonthNavProps {
  monthsWithEvents: number[]
}

export default function MonthNav({ monthsWithEvents }: MonthNavProps) {
  const [activeMonth, setActiveMonth] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-month]')
      let current: number | null = null

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 200) {
          current = parseInt(section.getAttribute('data-month') || '0', 10)
        }
      })

      setActiveMonth(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToMonth = (month: number) => {
    const section = document.querySelector(`[data-month="${month}"]`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="month-nav">
      <div className="month-nav-inner">
        {MONTHS.map((label, index) => {
          const hasEvents = monthsWithEvents.includes(index)
          const isActive = activeMonth === index

          return (
            <button
              key={index}
              className={`month-nav-pill${isActive ? ' active' : ''}${hasEvents && !isActive ? ' has-events' : ''}`}
              onClick={() => scrollToMonth(index)}
              disabled={!hasEvents}
              style={!hasEvents ? { opacity: 0.4, cursor: 'default' } : undefined}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
