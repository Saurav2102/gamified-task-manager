import { useState, useEffect, useRef } from "react"
import { useGame } from "../context/GameContext"
import "../styles/LevelUpToast.css"

function LevelUpToast() {
  const { level } = useGame()
  const prevLevelRef = useRef(level)
  const [show, setShow] = useState(false)
  const [toastLevel, setToastLevel] = useState(level)

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setToastLevel(level)
      setShow(true)
      const timer = setTimeout(() => setShow(false), 3500)
      prevLevelRef.current = level
      return () => clearTimeout(timer)
    }
    prevLevelRef.current = level
  }, [level])

  if (!show) return null

  return (
    <div className="toast-overlay" onClick={() => setShow(false)}>
      <div className="toast-box">
        <div className="toast-stars">⭐⭐⭐</div>
        <h2 className="toast-title">LEVEL UP!</h2>
        <div className="toast-level">
          <span className="toast-lvl-text">LVL</span>
          <span className="toast-lvl-number">{toastLevel}</span>
        </div>
        <p className="toast-message">You're getting stronger, Hero!</p>
        <p className="toast-hint">Tap anywhere to dismiss</p>
      </div>
    </div>
  )
}

export default LevelUpToast