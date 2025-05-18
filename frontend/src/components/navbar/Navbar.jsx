import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dinoLogo from "../../assets/tyrannosaurus-rex.png";
import "./navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <section
      id="navbar"
      style={{
        position: "fixed",
        top: show ? 0 : "-70px",
        transition: "top 0.3s",
      }}
    >
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
          Dinosaurs Index
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
