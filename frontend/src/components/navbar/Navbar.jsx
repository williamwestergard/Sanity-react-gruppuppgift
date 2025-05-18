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
          <article className="navbar-search-content">
            Search
            <svg
              className="navbar-search-icon"
              fill="#ffffff"
              height="16px"
              width="16px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              enableBackground="new 0 0 512 512"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  <path d="m495,466.1l-110.1-110.1c31.1-37.7 48-84.6 48-134 0-56.4-21.9-109.3-61.8-149.2-39.8-39.9-92.8-61.8-149.1-61.8-56.3,0-109.3,21.9-149.2,61.8-39.9,39.8-61.8,92.8-61.8,149.2 0,56.3 21.9,109.3 61.8,149.2 39.8,39.8 92.8,61.8 149.2,61.8 49.5,0 96.4-16.9 134-48l110.1,110c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9zm-393.3-123.9c-32.2-32.1-49.9-74.8-49.9-120.2 0-45.4 17.7-88.2 49.8-120.3 32.1-32.1 74.8-49.8 120.3-49.8 45.4,0 88.2,17.7 120.3,49.8 32.1,32.1 49.8,74.8 49.8,120.3 0,45.4-17.7,88.2-49.8,120.3-32.1,32.1-74.9,49.8-120.3,49.8-45.4,0-88.1-17.7-120.2-49.9z"></path>{" "}
                </g>
              </g>
            </svg>
          </article>
        </NavLink>
      </article>
    </section>
  );
};

export default Navbar;
