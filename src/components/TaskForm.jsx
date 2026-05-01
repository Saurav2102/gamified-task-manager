import { useState } from "react"
import { useGame } from "../context/GameContext"
import "../styles/TaskForm.css"

function TaskForm() {
  const { addTask } = useGame()
  const [title, setTitle] = useState("")
  const [difficulty, setDifficulty] = useState("easy")

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title.trim(), difficulty)
    setTitle("")
  }

  return (
    <div className="task-form-container">
      <h2 className="form-title">➕ Add New Quest</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />
        <div className="difficulty-selector">
          {["easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              type="button"
              className={`diff-btn diff-${d} ${difficulty === d ? "selected" : ""}`}
              onClick={() => setDifficulty(d)}
            >
              {d === "easy" ? "⚡ Easy (20 XP)" : d === "medium" ? "🔥 Medium (50 XP)" : "💀 Hard (100 XP)"}
            </button>
          ))}
        </div>
        <button type="submit" className="submit-btn">Add Quest</button>
      </form>
    </div>
  )
}

export default TaskForm