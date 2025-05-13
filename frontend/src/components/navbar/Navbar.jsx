import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <section id="navbar">
        <Link to={"/"}>
          <button>Home </button>
        </Link>
        <Link to={"/time-periods"}>
          <button>Time Periods </button>
        </Link>
        <Link to={"/dinosaurs-today"}>
          <button>Dinosaurs Today </button>
        </Link>

        <Link to={"/fun-facts"}>
          <button>Fun Facts </button>
        </Link>
      </section>
    </>
  );
};

export default Navbar;
