import { useGame } from "../context/GameContext"
import { motion } from "framer-motion"
import "../styles/Achievements.css"

const ALL_BADGES = [
  { id: "first_task",  icon: "🌱", name: "First Step",   description: "Complete your first task", color: "#4caf50" },
  { id: "ten_tasks",   icon: "🔄", name: "On a Roll",    description: "Complete 10 tasks",        color: "#2196f3" },
  { id: "twenty_five", icon: "💪", name: "Grinder",      description: "Complete 25 tasks",        color: "#9c27b0" },
  { id: "streak_3",    icon: "🔥", name: "Hat Trick",    description: "Get a 3 day streak",       color: "#ff9800" },
  { id: "streak_7",    icon: "⚡", name: "Week Warrior", description: "Get a 7 day streak",       color: "#e94560" },
  { id: "xp_500",      icon: "💎", name: "XP Hunter",    description: "Earn 500 XP total",        color: "#00bcd4" },
  { id: "xp_1000",     icon: "👑", name: "Legend",       description: "Earn 1000 XP total",       color: "#f0c040" },
]

function Achievements() {
  const { badges, xp, tasks } = useGame()
  const earnedIds = badges.map(b => b.id)
  const earnedCount = earnedIds.length
  const completedTasks = tasks.filter(t => t.completed).length

  return (
    <motion.div
      className="achievements-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="achievements-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="page-title">🏆 Achievements</h1>
          <p className="achievements-subtitle">{earnedCount} of {ALL_BADGES.length} badges unlocked</p>
        </div>
        <div className="achievements-summary">
          <div className="summary-item">
            <span className="summary-value">{completedTasks}</span>
            <span className="summary-label">Tasks Done</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{xp}</span>
            <span className="summary-label">Total XP</span>
          </div>
        </div>
      </motion.div>

      <div className="badges-progress-bar">
        <motion.div
          className="badges-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${(earnedCount / ALL_BADGES.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="badges-progress-text">{Math.round((earnedCount / ALL_BADGES.length) * 100)}% complete</p>

      <div className="badges-grid">
        {ALL_BADGES.map((badge, i) => {
          const earned = earnedIds.includes(badge.id)
          const earnedData = badges.find(b => b.id === badge.id)

          return (
            <motion.div
              key={badge.id}
              className={`badge-card ${earned ? "earned" : "locked"}`}
              style={earned ? { borderColor: badge.color } : {}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="badge-icon-wrapper" style={earned ? { background: badge.color + "22" } : {}}>
                <span className="badge-icon">{earned ? badge.icon : "🔒"}</span>
              </div>
              <h3 className="badge-name" style={earned ? { color: badge.color } : {}}>{badge.name}</h3>
              <p className="badge-description">{badge.description}</p>
              {earned && earnedData && (
                <p className="badge-earned-date">✅ {new Date(earnedData.earnedAt).toLocaleDateString()}</p>
              )}
              {!earned && <p className="badge-locked-text">Keep going!</p>}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Achievements