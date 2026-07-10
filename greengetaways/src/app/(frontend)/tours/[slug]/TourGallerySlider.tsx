'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface TourGallerySliderProps {
  images: { url: string; alt: string }[]
}

const AUTOPLAY_INTERVAL = 4000
const RESUME_DELAY = 6000

export default function TourGallerySlider({ images }: TourGallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }, [])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()
    if (images.length <= 1) return
    autoplayTimer.current = setInterval(() => {
      const el = trackRef.current
      if (!el || el.clientWidth === 0) return
      const current = Math.round(el.scrollLeft / el.clientWidth)
      scrollToIndex((current + 1) % images.length)
    }, AUTOPLAY_INTERVAL)
  }, [images.length, scrollToIndex, stopAutoplay])

  useEffect(() => {
    startAutoplay()
    return () => {
      stopAutoplay()
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [startAutoplay, stopAutoplay])

  const pauseAndScheduleResume = useCallback(() => {
    stopAutoplay()
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(startAutoplay, RESUME_DELAY)
  }, [startAutoplay, stopAutoplay])

  const handleScroll = () => {
    const el = trackRef.current
    if (!el || el.clientWidth === 0) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIndex(index)
  }

  const handleDotClick = (index: number) => {
    pauseAndScheduleResume()
    scrollToIndex(index)
  }

  if (images.length === 0) return null

  return (
    <div className="tour-gallery-slider">
      <div
        className="tour-gallery-slider-track"
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={pauseAndScheduleResume}
        onPointerDown={pauseAndScheduleResume}
      >
        {images.map((img, index) => (
          <div className="tour-gallery-slide" key={index}>
            <Image
              src={img.url}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <div className="tour-gallery-slider-counter">
            {activeIndex + 1} / {images.length}
          </div>
          <div className="tour-gallery-slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to photo ${index + 1}`}
                className={`tour-gallery-slider-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
