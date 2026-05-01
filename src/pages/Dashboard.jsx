import { useGame } from "../context/GameContext"
import XPBar from "../components/XPBar"
import StatsCards from "../components/StatsCards"
import RecentTasks from "../components/RecentTasks"
import "../styles/Dashboard.css"

function Dashboard() {
  const { level, streak } = useGame()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">🎮 Welcome back, Hero!</h1>
          <p className="dashboard-subtitle">
            {streak > 0
              ? `🔥 You're on a ${streak} day streak! Keep it up!`
              : "Complete a task today to start your streak!"}
          </p>
        </div>
        <div className="level-badge">
          <span className="level-badge-text">LVL</span>
          <span className="level-badge-number">{level}</span>
        </div>
      </div>

      <XPBar />
      <StatsCards />
      <RecentTasks />
    </div>
  )
}

export default Dashboard