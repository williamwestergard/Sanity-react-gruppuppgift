import "./dinoindexfacts.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar.jsx";
import BackArrow from "../../../assets/back-arrow.svg";
// import DinoFactPic from "./img/stego.jpg";
import ScrollToTop from "../../../components/scroll-to-top/ScrollToTop";
import DinoTimePeriodsImage from "../../../assets/dino-timeline-image.png";
import MockDinos from "../../../assets/db-with-img.json";

const DinoIndexFacts = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const dino = MockDinos.find((dino) => dino.name === decodedName);
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <section className="page-wrapper">
        <main id="main-content">
          <article className="go-back-to-index">
            <Link to="/dinosaurs-index">
              <img src={BackArrow} alt="Arrow Pointing to the Left" />
              Go to Index
            </Link>
          </article>

          <section id="dino-facts-content">
            <section className="dino-facts-right-side">
              <img
                className="dino-fact-image"
                src={dino.image_1}
                alt="Picture of a dinosaur"
              />
            </section>

            <section className="dino-facts-left-side">
              <article className="dino-facts-header">
                <h1>{dino.name}</h1>
                <p>
                  Prounciation: {dino.pronunciation}. Meaning: {dino.meaning}
                </p>
              </article>

              <article className="dino-facts-length-period">
                <p>
                  <span className="dino-facts-length-period-bold">
                    Length:{" "}
                  </span>
                  {dino.length}
                </p>
                <p>
                  <span className="dino-facts-length-period-bold">
                    Period:{" "}
                  </span>
                  {dino.period}
                </p>
              </article>

              <section className="dino-facts-desc">
                <p>{dino.description} </p>
              </section>

              <article className="dino-facts-diet">
                {" "}
                <span className="dino-facts-diet-bold">Diet: </span>
                {dino.diet}
              </article>
            </section>
          </section>
        </main>
        <img
          className="dino-time-periods-image"
          src={DinoTimePeriodsImage}
          alt="An image of dinosaurs walking towards the right"
        />
      </section>
    </>
  );
};

export default DinoIndexFacts;
