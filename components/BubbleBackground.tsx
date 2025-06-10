"use client"

import { useEffect } from 'react'

export default function BubbleBackground() {
  useEffect(() => {
    const bubbles = document.querySelectorAll('.bubble')
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      bubbles.forEach((bubble, index) => {
        const rect = bubble.getBoundingClientRect()
        const bubbleCenterX = rect.left + rect.width / 2
        const bubbleCenterY = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(mouseX - bubbleCenterX, 2) + Math.pow(mouseY - bubbleCenterY, 2)
        )

        // Interaction radius
        const interactionRadius = 150

        if (distance < interactionRadius) {
          const element = bubble as HTMLElement
          const intensity = 1 - (distance / interactionRadius)
          
          // Calculate repulsion direction
          const deltaX = bubbleCenterX - mouseX
          const deltaY = bubbleCenterY - mouseY
          const angle = Math.atan2(deltaY, deltaX)
          
          // Apply gentle push away from cursor
          const pushDistance = intensity * 30
          const offsetX = Math.cos(angle) * pushDistance
          const offsetY = Math.sin(angle) * pushDistance
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.3})`
          element.style.opacity = `${0.7 + intensity * 0.3}`
          element.style.filter = `blur(${0.5 - intensity * 0.5}px)`
          element.classList.add('cursor-near')
        } else {
          const element = bubble as HTMLElement
          element.style.transform = ''
          element.style.opacity = ''
          element.style.filter = ''
          element.classList.remove('cursor-near')
        }
      })
    }

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="bubble-background">
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  )
}