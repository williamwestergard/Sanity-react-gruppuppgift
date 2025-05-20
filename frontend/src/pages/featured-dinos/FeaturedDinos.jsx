import "./featureddinos.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import FeaturedDinoImage from "./img/t-rex.png";
import FeaturedDinoImageBg from "./img/featured-dino-bg.png";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import FeaturedDinosList from "./featured-dinos.json";

const FeaturedDinos = () => {
  const featureDino = FeaturedDinosList.find((dino) => dino.name);
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <section className="page-wrapper">
        <main id="main-content">
          <main id="featured-dinos-content">
            <nav className="featured-dinos-list">
              <ul>
                <li>Dinosaur 1</li>
                <li>Dinosaur 2</li>
                <li>Dinosaur 3</li>
                <li>Dinosaur 4</li>
                <li>Dinosaur 5</li>
              </ul>
            </nav>
            <article className="feature-dino-discovery-container">
              <p className="featured-dino-discovery-text">
                First discovered
                <article className="feature-dino-year-container">
                  <article className="featured-dino-discovery-year">
                    {featureDino.discovery}
                  </article>
                </article>
              </p>
            </article>

            <img
              className="feature-dino-image"
              src={FeaturedDinoImage}
              alt="A T-rex"
            />
            <img
              className="feature-dino-image-bg"
              src={FeaturedDinoImageBg}
              alt="A Dinosaur Claw"
            />

            <section className="featured-dino-name-and-type">
              <h1 className="featured-dino-name">
                {featureDino.name}
                <span className="featured-dino-name-big-bold">
                  {" "}
                  {featureDino.name2nd}
                </span>
              </h1>
              <p className="featured-dino-type">
                <span className="feature-dino-type-border">Type</span>{" "}
                {featureDino.type}
              </p>
            </section>

            <article className="feature-dino-information">
              <h2 className="feature-dino-information-header">
                {" "}
                {featureDino.header}
              </h2>
              <p className="feature-dino-information-text">
                {featureDino.desc.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </article>
            <span className="featured-dino-bottom-line"></span>
          </main>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default FeaturedDinos;
