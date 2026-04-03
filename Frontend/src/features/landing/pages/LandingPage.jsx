import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./LandingPage.scss"

const TYPING_TEXTS = [
  "machine learning articles...",
  "design inspiration...",
  "research papers...",
  "youtube videos...",
  "twitter threads...",
]

const FEATURES = [
  {
    icon: "⚡",
    title: "AI Auto-Tagging",
    desc: "Save anything — AI automatically suggests tags and topics"
  },
  {
    icon: "🔍",
    title: "Semantic Search",
    desc: "Search by meaning — no need to remember exact words"
  },
  {
    icon: "🕸️",
    title: "Knowledge Graph",
    desc: "Discover hidden connections between your saved ideas"
  },
  {
    icon: "📁",
    title: "Collections",
    desc: "Organize your items into folders your way"
  },
  {
    icon: "🌐",
    title: "Browser Extension",
    desc: "Save any webpage with just one click"
  },
  {
    icon: "🧠",
    title: "Memory Resurfacing",
    desc: "App reminds you what you saved months ago"
  },
]

const LandingPage = () => {
  const canvasRef = useRef(null)
  const [typingText, setTypingText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        star.alpha += star.speed
        if (star.alpha > 1 || star.alpha < 0) star.speed *= -1
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${star.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(current.slice(0, charIndex + 1))
        setCharIndex((p) => p + 1)
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setTypingText(current.slice(0, charIndex - 1))
        setCharIndex((p) => p - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTextIndex((p) => (p + 1) % TYPING_TEXTS.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <div className="landing">
      <canvas ref={canvasRef} className="stars-canvas" />

      <nav className="landing-nav">
        <div className="landing-logo">MindVault</div>
        <div className="landing-nav-links">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">🚀 Your Personal Knowledge Universe</div>
        <h1 className="hero-title">
          Save everything.<br />
          <span className="hero-highlight">Find anything.</span>
        </h1>
        <p className="hero-subtitle">
          Save anything from the internet — AI automatically organizes, tags and resurfaces it for you
        </p>

        <div className="typing-demo">
          <span className="typing-label">Searching for </span>
          <span className="typing-text">{typingText}</span>
          <span className="typing-cursor">|</span>
        </div>

        <div className="hero-btns">
          <Link to="/register" className="btn-primary btn-lg">
            Start for Free →
          </Link>
          <Link to="/login" className="btn-outline btn-lg">
            Login
          </Link>
        </div>
      </section>

      <section className="extension-section">
        <div className="extension-left">
          <div className="hero-badge">🌐 Browser Extension</div>
          <h2>Save any webpage<br />in one click</h2>
          <p>Install our Chrome extension — visit any webpage, click the icon, and it's saved to your knowledge universe instantly.</p>

          <a
            href="https://raw.githubusercontent.com/yugant-singh/Second-Brain/main/extension.zip"
            className="btn-primary btn-lg"
            download
            target="_blank"
            rel="noopener noreferrer"
          >Download Mindvault Extension</a>
        </div>

        <div className="extension-right">
          <div className="ext-step">
            <span className="ext-step-num">1</span>
            <p>Download and extract the extension zip file</p>
          </div>
          <div className="ext-step">
            <span className="ext-step-num">2</span>
            <p>Open <code>chrome://extensions</code> and enable Developer Mode</p>
          </div>
          <div className="ext-step">
            <span className="ext-step-num">3</span>
            <p>Click "Load Unpacked" and select the extracted folder</p>
          </div>
          <div className="ext-step">
            <span className="ext-step-num">4</span>
            <p>Login with your MindVault account and start saving!</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Everything in one place</h2>
        <p className="features-subtitle">Save anything — AI makes it smart</p>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to build your knowledge universe?</h2>
        <Link to="/register" className="btn-primary btn-lg">
          Get Started — It's Free
        </Link>
      </section>

    </div>
  )

}

export default LandingPage