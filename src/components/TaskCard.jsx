import { memo } from "react"
import { useGame } from "../context/GameContext"
import "../styles/TaskCard.css"

const TaskCard = memo(function TaskCard({ task }) {
  const { completeTask, deleteTask } = useGame()

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-left">
        <button
          className={`complete-btn ${task.completed ? "done" : ""}`}
          onClick={() => completeTask(task.id)}
          disabled={task.completed}
        >
          {task.completed ? "✅" : "⭕"}
        </button>
        <div className="task-info">
          <p className="task-title">{task.title}</p>
          <span className={`difficulty-badge diff-${task.difficulty}`}>
            {task.difficulty === "easy" ? "⚡ Easy" : task.difficulty === "medium" ? "🔥 Medium" : "💀 Hard"}
          </span>
        </div>
      </div>
      <div className="task-right">
        <span className="xp-reward">+{task.xpReward} XP</span>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </div>
  )
})

export default TaskCard