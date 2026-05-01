import { useGame } from "../context/GameContext"
import "../styles/XPBar.css"

function XPBar() {
  const { xp, level, xpProgress, xpNeeded } = useGame()
  const percentage = Math.min((xpProgress / xpNeeded) * 100, 100)

  return (
    <div className="xpbar-container">
      <div className="xpbar-header">
        <span className="xpbar-level">🌟 Level {level}</span>
        <span className="xpbar-numbers">{xpProgress} / {xpNeeded} XP</span>
      </div>
      <div className="xpbar-track">
        <div className="xpbar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="xpbar-total">Total XP: {xp}</p>
    </div>
  )
}

export default XPBar