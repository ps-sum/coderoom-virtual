import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const auth = require('./../auth/auth-helper').default
    if (auth.isAuthenticated()) {
      setRedirect(true)
    }
    setLoaded(true)
  }, [])

  if (!loaded) return null
  if (redirect) return <Redirect to="/courses" />

  return (
    <div className="landing-container">
      <style>{`
        .landing-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #10b981 100%);
          font-family: sans-serif;
        }

        .background-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
        }

        .shape-1 {
          top: 80px;
          left: 40px;
          width: 128px;
          height: 128px;
          background: rgba(254, 240, 138, 0.3);
          animation: float 6s ease-in-out infinite;
        }

        .shape-2 {
          top: 160px;
          right: 80px;
          width: 96px;
          height: 96px;
          background: rgba(134, 239, 172, 0.4);
          animation: float-delayed 8s ease-in-out infinite;
        }

        .shape-3 {
          bottom: 128px;
          left: 25%;
          width: 160px;
          height: 160px;
          background: rgba(147, 197, 253, 0.2);
          animation: pulse 4s ease-in-out infinite;
        }

        .main-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 16px;
        }

        .glass-card {
          position: relative;
          padding: 48px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          text-align: center;
          color: white;
          max-width: 768px;
        }

        .main-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 32px;
          animation: title-glow 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(45deg, #034d38ff, #044633ff); /* Dark green */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

       .subtitle {
  font-size: 1.25rem;
  margin-bottom: 48px;
  color: #f97316;;
  line-height: 1.6;
  font-weight: bold;
  animation: fade-in-up 1s ease-out forwards;
}

        .interactive-button {
          position: relative;
          padding: 16px 32px;
          font-size: 1.125rem;
          font-weight: bold;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          color: #1e40af;
        }

        .interactive-button:hover {
          transform: scale(1.05);
          color: #1e3a8a;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes title-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(16, 185, 129, 0.3); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .main-title { font-size: 2rem; }
          .subtitle { font-size: 1rem; }
          .glass-card { padding: 24px; }
        }

        @media (max-width: 480px) {
          .main-title { font-size: 1.5rem; }
        }
      `}</style>

      {/* Background Shapes */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="glass-card">
          <h1 className="main-title gradient-text">Welcome to CodeRoom</h1>
          <p className="subtitle">
            Learn. Teach. Grow. Explore curated courses made for students and educators.
          </p>
          <a href="/courses">
            <button className="interactive-button">Browse Courses</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
