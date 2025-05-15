import { Link } from "react-router-dom";
import dinoLogo from "../../assets/logo_animation.webm"; //Madelen Logo

import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <section id="navbar">
        <article id="navbar-logo">
          <Link to={"/"}>
            <video
              src={dinoLogo}
              alt="Dino Logo"
              className="logo-img"
              onMouseOver={(event) => event.target.play()}
            />{" "}
            {/*New icon instead of LOGO*/}
          </Link>
        </article>
        <article id="navbar-right-side">
          <Link to={"/time-periods"}>Time Periods</Link>
          <Link to={"/dinosaurs-today"}>Dinosaurs Today</Link>
          <Link to={"/did-you-know"}>Did you Know?</Link>
          <Link to={"/search"}>Search</Link>
        </article>
      </section>
    </>
  );
};

export default Navbar;
