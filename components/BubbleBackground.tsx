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
        const interactionRadius = 200

        if (distance < interactionRadius) {
          const element = bubble as HTMLElement
          const intensity = 1 - (distance / interactionRadius)
          
          // Calculate repulsion direction
          const deltaX = bubbleCenterX - mouseX
          const deltaY = bubbleCenterY - mouseY
          const angle = Math.atan2(deltaY, deltaX)
          
          // Apply gentle push away from cursor
          const pushDistance = intensity * 40
          const offsetX = Math.cos(angle) * pushDistance
          const offsetY = Math.sin(angle) * pushDistance
          
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.5})`
          element.style.opacity = `${0.7 + intensity * 0.3}`
          element.style.filter = `blur(${0.5 - intensity * 0.5}px)`
          element.classList.add('cursor-near')
          
          // Add hover effect
          element.style.boxShadow = `0 0 ${intensity * 30}px rgba(147, 51, 234, ${intensity * 0.8})`
        } else {
          const element = bubble as HTMLElement
          element.style.transform = ''
          element.style.opacity = ''
          element.style.filter = ''
          element.style.boxShadow = ''
          element.classList.remove('cursor-near')
        }
      })
    }

    const handleClick = (e: MouseEvent) => {
      // Create ripple effect on click
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        animation: rippleEffect 0.6s ease-out forwards;
      `
      
      document.body.appendChild(ripple)
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 600)

      // Remove the bubble bounce effect - commented out
      // bubbles.forEach((bubble) => {
      //   const rect = bubble.getBoundingClientRect()
      //   const bubbleCenterX = rect.left + rect.width / 2
      //   const bubbleCenterY = rect.top + rect.height / 2
      //   
      //   const distance = Math.sqrt(
      //     Math.pow(e.clientX - bubbleCenterX, 2) + Math.pow(e.clientY - bubbleCenterY, 2)
      //   )

      //   if (distance < 300) {
      //     const element = bubble as HTMLElement
      //     element.style.animation = 'none'
      //     element.style.transform = 'scale(1.3)'
      //     
      //     setTimeout(() => {
      //       element.style.transform = ''
      //       element.style.animation = ''
      //     }, 300)
      //   }
      // })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    // Add CSS for ripple animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes rippleEffect {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: scale(0.5);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
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
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  )
}