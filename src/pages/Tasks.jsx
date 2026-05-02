import { useGame } from "../context/GameContext"
import { motion, AnimatePresence } from "framer-motion"
import TaskForm from "../components/TaskForm"
import TaskCard from "../components/TaskCard"
import "../styles/Tasks.css"

function Tasks() {
  const { tasks } = useGame()

  const activeTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <motion.div
      className="tasks-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        ⚔️ Your Quests
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <TaskForm />
      </motion.div>

      <AnimatePresence>
        {activeTasks.length === 0 && completedTasks.length === 0 && (
          <motion.div
            key="empty"
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p>🎯 No quests yet! Add one above to start earning XP.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Active ({activeTasks.length})</h3>
          <AnimatePresence mode="popLayout">
            {activeTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, scaleY: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Completed ({completedTasks.length})</h3>
          <AnimatePresence mode="popLayout">
            {completedTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, scaleY: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default Tasks