import { NavLink } from "react-router-dom"
import { useGame } from "../context/GameContext"
import "../styles/Navbar.css"

function Navbar() {
  const { xp, level, streak } = useGame()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎮</span>
        <span className="brand-name">QuestBoard</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ✅ Tasks
        </NavLink>
        <NavLink to="/achievements" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏆 Achievements
        </NavLink>
      </div>

      <div className="navbar-stats">
        <span className="stat">⚡ {xp} XP</span>
        <span className="stat">🌟 Level {level}</span>
        <span className="stat">🔥 {streak} day streak</span>
      </div>
    </nav>
  )
}

export default Navbar