import { useGame } from "../context/GameContext"
import { useNavigate } from "react-router-dom"
import "../styles/RecentTasks.css"

function RecentTasks() {
  const { tasks } = useGame()
  const navigate = useNavigate()

  const recent = tasks.slice(0, 5)

  return (
    <div className="recent-container">
      <div className="recent-header">
        <h2 className="recent-title">📋 Recent Quests</h2>
        <button className="view-all-btn" onClick={() => navigate("/tasks")}>
          View All →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="recent-empty">
          <p>No quests yet! <span onClick={() => navigate("/tasks")} className="link">Add your first one →</span></p>
        </div>
      ) : (
        <div className="recent-list">
          {recent.map(task => (
            <div key={task.id} className={`recent-item ${task.completed ? "done" : ""}`}>
              <span className="recent-icon">{task.completed ? "✅" : "⭕"}</span>
              <span className="recent-name">{task.title}</span>
              <span className={`recent-diff diff-${task.difficulty}`}>{task.difficulty}</span>
              <span className="recent-xp">+{task.xpReward} XP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentTasks