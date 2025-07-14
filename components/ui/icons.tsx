'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 102, y: 128 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 154, y: 128 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate mouse position relative to SVG center
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Scale factor for pupil movement
      const scale = 0.08

      // Calculate pupil positions (constrained within eye bounds)
      const maxOffset = 6 // Maximum offset from center

      // Left eye (centered at 102, 128)
      const leftOffsetX = Math.max(-maxOffset, Math.min(maxOffset, mouseX * scale))
      const leftOffsetY = Math.max(-maxOffset, Math.min(maxOffset, mouseY * scale))
      
      // Right eye (centered at 154, 128)
      const rightOffsetX = Math.max(-maxOffset, Math.min(maxOffset, mouseX * scale))
      const rightOffsetY = Math.max(-maxOffset, Math.min(maxOffset, mouseY * scale))

      setLeftPupilPos({ x: 102 + leftOffsetX, y: 128 + leftOffsetY })
      setRightPupilPos({ x: 154 + rightOffsetX, y: 128 + rightOffsetY })
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="128" cy="128" r="128" fill="black"></circle>
      {/* Left eye white */}
      <circle cx="102" cy="128" r="18" fill="white"></circle>
      {/* Right eye white */}
      <circle cx="154" cy="128" r="18" fill="white"></circle>
      {/* Left pupil */}
      <circle 
        cx={leftPupilPos.x} 
        cy={leftPupilPos.y} 
        r="8" 
        fill="black"
        style={{ transition: 'all 0.1s ease-out' }}
      />
      {/* Right pupil */}
      <circle 
        cx={rightPupilPos.x} 
        cy={rightPupilPos.y} 
        r="8" 
        fill="black"
        style={{ transition: 'all 0.1s ease-out' }}
      />
    </svg>
  )
}

export { IconLogo }