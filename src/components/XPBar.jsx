import { memo } from "react"
import { useGame } from "../context/GameContext"
import { motion } from "framer-motion"
import "../styles/XPBar.css"

const XPBar = memo(function XPBar() {
  const { xp, level, xpProgress, xpNeeded } = useGame()
  const percentage = Math.min((xpProgress / xpNeeded) * 100, 100)

  return (
    <div className="xpbar-container">
      <div className="xpbar-header">
        <span className="xpbar-level">🌟 Level {level}</span>
        <span className="xpbar-numbers">{xpProgress} / {xpNeeded} XP</span>
      </div>
      <div className="xpbar-track">
        <motion.div
          className="xpbar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="xpbar-total">Total XP: {xp}</p>
    </div>
  )
})

export default XPBar