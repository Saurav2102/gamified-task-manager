import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useGame } from "./context/GameContext"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Achievements from "./pages/Achievements"
import LevelUpToast from "./components/LevelUpToast"
import LoadingScreen from "./components/LoadingScreen"
import ErrorBoundary from "./components/ErrorBoundary"

function AppContent() {
  const { isLoading } = useGame()

  if (isLoading) return <LoadingScreen />

  return (
    <>
      <Navbar />
      <LevelUpToast />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app">
          <AppContent />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App