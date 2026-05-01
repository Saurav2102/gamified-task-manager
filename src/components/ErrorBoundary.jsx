import { Component } from "react"
import "../styles/ErrorBoundary.css"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">{this.state.error?.message || "An unexpected error occurred"}</p>
            <button
              className="error-btn"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = "/"
              }}
            >
              🏠 Go back home
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary