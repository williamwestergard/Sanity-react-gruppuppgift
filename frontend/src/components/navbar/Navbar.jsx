import { NavLink } from "react-router-dom";
import dinoLogo from "../../assets/tyrannosaurus-rex.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <section id="navbar">
      <article id="navbar-logo">
        <NavLink to="/">
          <img src={dinoLogo} alt="Dino Logo" className="logo-img" />
        </NavLink>
      </article>
      <article id="navbar-right-side">
        <NavLink
          to="/dinosaurs-index"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dinosaurs index
        </NavLink>
        <NavLink
          to="/time-periods"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Time Periods
        </NavLink>
        <NavLink
          to="/dinosaurs-today"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dinosaurs Today
        </NavLink>
        <NavLink
          to="/did-you-know"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Did you Know?
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Search
        </NavLink>
      </article>
    </section>
  );
};

export default Navbar;
