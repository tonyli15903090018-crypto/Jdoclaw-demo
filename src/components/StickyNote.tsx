import { useState } from 'react'
import './StickyNote.css'

interface StickyNoteProps {
  title: string
  content: string
  x?: number
  y?: number
  color?: 'yellow' | 'pink' | 'blue' | 'green'
  closable?: boolean
  onClose?: () => void
}

const StickyNote = ({ 
  title, 
  content, 
  x = 50, 
  y = 50, 
  color = 'yellow',
  closable = true,
  onClose 
}: StickyNoteProps) => {
  const [position, setPosition] = useState({ x, y })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={`sticky-note ${color} ${isDragging ? 'dragging' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="sticky-header" onMouseDown={handleMouseDown}>
        <h4>{title}</h4>
        {closable && (
          <button className="sticky-close" onClick={onClose}>×</button>
        )}
      </div>
      <div className="sticky-content">
        <p>{content}</p>
      </div>
      <div className="sticky-pin">📌</div>
    </div>
  )
}

export default StickyNote
