import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          color: "white",
          background: "#1a1a1a",
          padding: "20px",
          fontFamily: "monospace",
          fontSize: "14px",
          minHeight: "100vh",
          wordBreak: "break-all",
        }}>
          <h2 style={{ color: "#ff4444" }}>App crashed — error details:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px", color: "#aaa" }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
