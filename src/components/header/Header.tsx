import "./style.scss"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav className="header">
      <h1>analyze.com 📊 </h1>
      <div>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "link-selected" : "")}
        >
          Graph
        </NavLink>
        <NavLink
          to={"/compress"}
          className={({ isActive }) => (isActive ? "link-selected" : "")}
        >
          Compress
        </NavLink>
      </div>
    </nav>
  )
}

export default Header
