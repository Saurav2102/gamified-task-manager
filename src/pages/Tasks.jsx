import { useGame } from "../context/GameContext"
import TaskForm from "../components/TaskForm"
import TaskCard from "../components/TaskCard"
import "../styles/Tasks.css"

function Tasks() {
  const { tasks } = useGame()

  const activeTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div className="tasks-page">
      <h1 className="page-title">⚔️ Your Quests</h1>
      <TaskForm />

      {activeTasks.length === 0 && completedTasks.length === 0 && (
        <div className="empty-state">
          <p>🎯 No quests yet! Add one above to start earning XP.</p>
        </div>
      )}

      {activeTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Active ({activeTasks.length})</h3>
          {activeTasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Completed ({completedTasks.length})</h3>
          {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}
    </div>
  )
}

export default Tasks