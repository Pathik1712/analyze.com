import { Routes, Route, useLocation } from "react-router-dom"
import Body from "../body/Body"
import { useEffect, useState } from "react"
import Compress from "../compress/Compress"
import "./style.scss"

const Layout = () => {
  const location = useLocation()

  const [displayLocation, setDiplayLocation] = useState(location)
  const [transition, setTransition] = useState("fadein")

  useEffect(() => {
    if (location !== displayLocation) {
      setTransition("fadeout")
    }
  }, [displayLocation, location])
  return (
    <div
      className={transition}
      onAnimationEnd={() => {
        if (transition === "fadeout") {
          setTransition("fadein")
          setDiplayLocation(location)
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route
          path="/"
          element={<Body />}
        />
        <Route
          path="/compress"
          element={<Compress />}
        />
      </Routes>
    </div>
  )
}

export default Layout
