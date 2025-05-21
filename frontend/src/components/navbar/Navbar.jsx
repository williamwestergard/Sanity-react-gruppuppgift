import { Link } from "react-router-dom";
import dinoLogo from "../../assets/tyrannosaurus-rex.png"; //Madelen Logo
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <section id="navbar">
        <article id="navbar-logo">
          <Link to={"/"}>
            <img src={dinoLogo} alt="Dino Logo" className="logo-img" />{" "}
            {/*New icon instead of LOGO*/}
          </Link>
        </article>
        <article id="navbar-right-side">
          <Link to={"/time-periods"}>Time Periods</Link>
          <Link to={"/dinosaurs-today"}>Dinosaurs Today</Link>
          <Link to={"/did-you-know"}>Did you Know?</Link>
          <Link to={"/about-us"}>About Us</Link>
          <Link to={"/search"}>Search</Link>
        </article>
      </section>

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
        <article
          id="navbar-right-side"
          style={{ display: menuOpen ? "flex" : "none" }}
        >
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

          <section className="dropdown-navbar">
            <button className="dropdown-navbar-button">Games</button>
            <section className="dropdown-content">
              <NavLink
                to="/dino-vs-dino"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Dino vs Dino
              </NavLink>
              <NavLink
                to="/dino-rpg"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Dino RPG
              </NavLink>
              <NavLink
                id="navbar-dino-game"
                to="/guess-that-dino"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Guess That Dino
              </NavLink>
            </section>
          </section>
        </article>
        {menuOpen ? (
          // Close Icon
          <svg
            id="hamburger-menu-close-icon"
            onClick={toggleMenu}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="#ffffff"
              />
            </g>
          </svg>
        ) : (
          // Hamburger Icon
          <svg
            id="hamburger-menu"
            onClick={toggleMenu}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20 7L4 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 12L4 12"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 17L4 17"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}
      </section>
    </>
  );
};

export default Navbar;
