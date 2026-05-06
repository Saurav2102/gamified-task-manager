import { useGame } from "../context/GameContext"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import XPBar from "../components/XPBar"
import StatsCards from "../components/StatsCards"
import RecentTasks from "../components/RecentTasks"
import "../styles/Dashboard.css"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
}

function Dashboard() {
  const { level, streak } = useGame()
  const [quote, setQuote] = useState(null)
  const [quoteLoading, setQuoteLoading] = useState(true)
  const [quoteError, setQuoteError] = useState(false)

  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then(res => res.json())
      .then(data => {
        setQuote(data)
        setQuoteLoading(false)
      })
      .catch(() => {
        setQuoteError(true)
        setQuoteLoading(false)
      })
  }, [])

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="dashboard-header" custom={0} variants={fadeUp} initial="hidden" animate="visible">
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
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <XPBar />
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
        <StatsCards />
      </motion.div>

      <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible">
        <div className="quote-card">
          <span className="quote-icon">💬</span>
          {quoteLoading && <p className="quote-text">Loading quote...</p>}
          {quoteError && <p className="quote-text">Stay focused and keep grinding! 💪</p>}
          {quote && !quoteLoading && (
            <>
              <p className="quote-text">"{quote.quote}"</p>
              <p className="quote-author">— {quote.author}</p>
            </>
          )}
        </div>
      </motion.div>

      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
        <RecentTasks />
      </motion.div>
    </motion.div>
  )
}

export default Dashboard