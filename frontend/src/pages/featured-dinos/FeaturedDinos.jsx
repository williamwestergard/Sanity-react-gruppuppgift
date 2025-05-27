import { useState, useRef, useEffect } from "react";
import "./featureddinos.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import FeaturedDinoImageBg from "./img/featured-dino-bg.png";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import FeaturedDinosList from "./featured-dinos.json";

const FeaturedDinos = () => {
  const [selectedDino, setSelectedDino] = useState(FeaturedDinosList[0]);
  const imageRef = useRef(null);

  const handleDinoClick = (dino) => {
    setSelectedDino(dino);

    // Restart animation
    if (imageRef.current) {
      imageRef.current.classList.remove("feature-dino-image-animate");

      // Force a reflow so the animation can be re-triggered
      void imageRef.current.offsetWidth;

      imageRef.current.classList.add("feature-dino-image-animate");
    }
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <section className="page-wrapper">
        <main id="main-content">
          <main id="featured-dinos-content">
            <nav className="featured-dinos-list">
              <ul>
                {FeaturedDinosList.map((dino, index) => (
                  <li
                    key={index}
                    onClick={() => handleDinoClick(dino)}
                    style={{ cursor: "pointer" }}
                  >
                    {dino.link}
                  </li>
                ))}
              </ul>
            </nav>

            <article className="feature-dino-discovery-container">
              <p className="featured-dino-discovery-text">
                First discovered
                <article className="feature-dino-year-container">
                  <article className="featured-dino-discovery-year">
                    {selectedDino.discovery}
                  </article>
                </article>
              </p>
            </article>

            <img
              ref={imageRef}
              className="feature-dino-image feature-dino-image-animate"
              src={selectedDino.image}
              alt={selectedDino.name}
            />

            <section className="featured-dino-name-and-type">
              <h1 className="featured-dino-name">
                {selectedDino.name}
                <span className="featured-dino-name-big-bold">
                  {" "}
                  {selectedDino.name2nd}
                </span>
              </h1>
              <p className="featured-dino-type">
                <span className="feature-dino-type-border">Type</span>{" "}
                {selectedDino.type}
              </p>
            </section>

            <article className="feature-dino-information">
              <h2 className="feature-dino-information-header">
                {selectedDino.header}
              </h2>
              <p className="feature-dino-information-text">
                {selectedDino.desc.split("\n").map((line, index) => (
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
