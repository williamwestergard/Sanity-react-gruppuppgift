import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <section id="navbar">
        <article id="navbar-logo">
          <Link to={"/"}>Logo</Link>
        </article>
        <article id="navbar-right-side">
          <Link to={"/time-periods"}>Time Periods</Link>
          <Link to={"/dinosaurs-today"}>Dinosaurs Today</Link>
          <Link to={"/fun-facts"}>Fun Facts</Link>
          <Link to={"/search"}>Search</Link>
        </article>
      </section>
    </>
  );
};

export default Navbar;
