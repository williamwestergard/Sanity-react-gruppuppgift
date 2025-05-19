import { Link } from "react-router-dom";
import dinoLogo from "../../assets/tyrannosaurus-rex.png"; //Madelen Logo
import "./navbar.css";

const Navbar = () => {
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
    </>
  );
};

export default Navbar;
