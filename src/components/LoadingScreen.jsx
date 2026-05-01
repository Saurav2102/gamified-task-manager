import "../styles/LoadingScreen.css"

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">🎮</div>
        <h2 className="loading-title">QuestBoard</h2>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
        <p className="loading-text">Loading your quests...</p>
      </div>
    </div>
  )
}

export default LoadingScreen