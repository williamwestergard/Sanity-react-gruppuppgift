import "./footer.css";
import dinoLogoAnimated from "../../assets/logo_animation.webm";

const Footer = () => {
  return (
    <>
      <section id="footer-content">
        <article className="footer-container">
          <p> Made with React and Sanity </p>
          <video
            src={dinoLogoAnimated}
            alt="Dino Logo"
            className="dino-logo-animated"
            onMouseOver={(event) => event.target.play()}
          />{" "}
          {/*New icon instead of LOGO*/}
        </article>
      </section>
    </>
  );
};

export default Footer;
