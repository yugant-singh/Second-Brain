import "./Loader.scss"

const Loader = ({ fullScreen = false }) => {
  return (
    <div className={`loader-wrapper ${fullScreen ? "full-screen" : ""}`}>
      <div className="loader-orbit">
        <div className="loader-core" />
        <div className="loader-ring" />
        <div className="loader-dot" />
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  )
}

export default Loader