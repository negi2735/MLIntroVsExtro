"use client"

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }]
        return newTrail.slice(-8) // Keep only last 8 trail points
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: '6px',
            height: '6px',
            background: `rgba(147, 51, 234, ${0.8 - (index * 0.1)})`,
            animation: `fadeOut 0.5s ease-out forwards`,
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
      
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border-2 border-purple-400 bg-purple-400/20 backdrop-blur-sm transition-all duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          width: '24px',
          height: '24px',
        }}
      />
      
      {/* Cursor Center Dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-purple-400"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
          width: '4px',
          height: '4px',
        }}
      />
    </>
  )
}