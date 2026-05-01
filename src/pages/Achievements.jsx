import { useGame } from "../context/GameContext"
import "../styles/Achievements.css"

const ALL_BADGES = [
  { id: "first_task",  icon: "🌱", name: "First Step",    description: "Complete your first task",  color: "#4caf50" },
  { id: "ten_tasks",   icon: "🔄", name: "On a Roll",     description: "Complete 10 tasks",         color: "#2196f3" },
  { id: "twenty_five", icon: "💪", name: "Grinder",       description: "Complete 25 tasks",         color: "#9c27b0" },
  { id: "streak_3",    icon: "🔥", name: "Hat Trick",     description: "Get a 3 day streak",        color: "#ff9800" },
  { id: "streak_7",    icon: "⚡", name: "Week Warrior",  description: "Get a 7 day streak",        color: "#e94560" },
  { id: "xp_500",      icon: "💎", name: "XP Hunter",     description: "Earn 500 XP total",         color: "#00bcd4" },
  { id: "xp_1000",     icon: "👑", name: "Legend",        description: "Earn 1000 XP total",        color: "#f0c040" },
]

function Achievements() {
  const { badges, xp, tasks } = useGame()

  const earnedIds = badges.map(b => b.id)
  const earnedCount = earnedIds.length

  const completedTasks = tasks.filter(t => t.completed).length

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <div>
          <h1 className="page-title">🏆 Achievements</h1>
          <p className="achievements-subtitle">
            {earnedCount} of {ALL_BADGES.length} badges unlocked
          </p>
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
      </div>

      <div className="badges-progress-bar">
        <div
          className="badges-progress-fill"
          style={{ width: `${(earnedCount / ALL_BADGES.length) * 100}%` }}
        />
      </div>
      <p className="badges-progress-text">{Math.round((earnedCount / ALL_BADGES.length) * 100)}% complete</p>

      <div className="badges-grid">
        {ALL_BADGES.map(badge => {
          const earned = earnedIds.includes(badge.id)
          const earnedData = badges.find(b => b.id === badge.id)

          return (
            <div
              key={badge.id}
              className={`badge-card ${earned ? "earned" : "locked"}`}
              style={earned ? { borderColor: badge.color } : {}}
            >
              <div
                className="badge-icon-wrapper"
                style={earned ? { background: badge.color + "22" } : {}}
              >
                <span className="badge-icon">{earned ? badge.icon : "🔒"}</span>
              </div>
              <h3 className="badge-name" style={earned ? { color: badge.color } : {}}>
                {badge.name}
              </h3>
              <p className="badge-description">{badge.description}</p>
              {earned && earnedData && (
                <p className="badge-earned-date">
                  ✅ {new Date(earnedData.earnedAt).toLocaleDateString()}
                </p>
              )}
              {!earned && (
                <p className="badge-locked-text">Keep going!</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Achievements