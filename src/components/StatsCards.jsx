import { memo, useMemo } from "react"
import { useGame } from "../context/GameContext"
import "../styles/StatsCards.css"

const StatsCards = memo(function StatsCards() {
  const { tasks, streak, badges } = useGame()

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length
    const active = tasks.filter(t => !t.completed).length
    return [
      { icon: "🔥", label: "Day Streak",    value: streak,        color: "#e94560" },
      { icon: "✅", label: "Tasks Done",    value: completed,     color: "#4caf50" },
      { icon: "⚔️", label: "Active Quests", value: active,        color: "#ff9800" },
      { icon: "🏆", label: "Badges Earned", value: badges.length, color: "#f0c040" },
    ]
  }, [tasks, streak, badges])

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-icon">{stat.icon}</span>
          <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
})

export default StatsCards