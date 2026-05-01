import { createContext, useContext, useState, useEffect } from "react"

const GameContext = createContext()

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 850, 1300, 1900, 2600, 3400, 4300, 5300]

function calculateLevel(xp) {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
    }
  }
  return level
}

function getXPForNextLevel(level) {
  return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
}

export function GameProvider({ children }) {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("xp")
    return saved ? Number(saved) : 0
  })

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak")
    return saved ? Number(saved) : 0
  })

  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || null
  })

  const [isLoading, setIsLoading] = useState(true)
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem("badges")
    return saved ? JSON.parse(saved) : []
  })

  const level = calculateLevel(xp)
  const xpForNextLevel = getXPForNextLevel(level)
  const xpForCurrentLevel = LEVEL_THRESHOLDS[level - 1] || 0
  const xpProgress = xp - xpForCurrentLevel
  const xpNeeded = xpForNextLevel - xpForCurrentLevel

  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { localStorage.setItem("xp", xp) }, [xp])
  useEffect(() => { localStorage.setItem("streak", streak) }, [streak])
  useEffect(() => { localStorage.setItem("lastCompletedDate", lastCompletedDate) }, [lastCompletedDate])
  useEffect(() => { localStorage.setItem("badges", JSON.stringify(badges)) }, [badges])
  useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 800)
  return () => clearTimeout(timer)
}, [])

  function checkBadges(newXp, newStreak, completedTasks) {
    const newBadges = [...badges]
    const addBadge = (id, name, description) => {
      if (!newBadges.find(b => b.id === id)) {
        newBadges.push({ id, name, description, earnedAt: new Date().toISOString() })
      }
    }
    if (completedTasks >= 1)  addBadge("first_task", "First Step", "Completed your first task!")
    if (completedTasks >= 10) addBadge("ten_tasks", "On a Roll", "Completed 10 tasks!")
    if (completedTasks >= 25) addBadge("twenty_five", "Grinder", "Completed 25 tasks!")
    if (newStreak >= 3)       addBadge("streak_3", "Hat Trick", "3 day streak!")
    if (newStreak >= 7)       addBadge("streak_7", "Week Warrior", "7 day streak!")
    if (newXp >= 500)         addBadge("xp_500", "XP Hunter", "Earned 500 XP!")
    if (newXp >= 1000)        addBadge("xp_1000", "Legend", "Earned 1000 XP!")
    setBadges(newBadges)
  }

  function addTask(title, difficulty) {
    const xpReward = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100
    const newTask = {
      id: Date.now(),
      title,
      difficulty,
      xpReward,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])
  }

  function completeTask(taskId) {
    let earnedXP = 0
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        earnedXP = task.xpReward
        return { ...task, completed: true, completedAt: new Date().toISOString() }
      }
      return task
    })
    if (earnedXP === 0) return
    const newXp = xp + earnedXP
    setXp(newXp)
    setTasks(updatedTasks)
    const today = new Date().toDateString()
    let newStreak = streak
    if (lastCompletedDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      newStreak = lastCompletedDate === yesterday.toDateString() ? streak + 1 : 1
      setStreak(newStreak)
      setLastCompletedDate(today)
    }
    const completedCount = updatedTasks.filter(t => t.completed).length
    checkBadges(newXp, newStreak, completedCount)
  }

  function deleteTask(taskId) {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  return (
    <GameContext.Provider value={{
      tasks, xp, level, streak, badges,
      xpProgress, xpNeeded, xpForNextLevel,
      isLoading,
      addTask, completeTask, deleteTask
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}