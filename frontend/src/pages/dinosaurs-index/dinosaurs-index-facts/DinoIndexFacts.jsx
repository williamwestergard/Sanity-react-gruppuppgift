import "./dinoindexfacts.css";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar.jsx";
import BackArrow from "../../../assets/back-arrow.svg";
import DinoFactPic from "./img/stego.jpg";

const DinoIndexFacts = () => {
  return (
    <>
      <Navbar />

      <article className="go-back-to-index">
        <Link to="/dinosaurs-index">
          <img src={BackArrow} alt="Arrow Pointing to the Left" />
          Go back
        </Link>
      </article>

      <main id="dino-facts-content">
        <section className="dino-facts-right-side">
          <img
            className="dino-fact-image"
            src={DinoFactPic}
            alt="Picture of a dinosaur"
          />
        </section>

        <section className="dino-facts-left-side">
          <article className="dino-facts-header">
            <h1>Stegosaurus</h1>
            <p>STEG-oh-SORE-us. Name meaning:'roof lizard'</p>
          </article>

          <article className="dino-facts-length-period">
            <p>
              <span className="dino-facts-length-period-bold">Length: </span>
              9.2M
            </p>
            <p>
              <span className="dino-facts-length-period-bold">Period: </span>
              Late Jurassic
            </p>
          </article>

          <p>
            Stegosaurus would have defended itself from predators like
            Allosaurus and Ceratosaurus with its powerful spiked tail.
            <br /> <br />
            The bony plates along its back were embedded in the skin of the
            animal, not attached to its skeleton, which is why in most fossil
            finds the plates are separated from the body. When O C Marsh
            described the first fossil of a Stegosaurus, he concluded that the
            plates would have lain flat on its back.
            <br /> <br />
            After finding a specimen that had been covered with mud, which had
            held the plates in place, Marsh realised that they stood vertically,
            alternately on either side of the spine. Scientists are not exactly
            sure what the plates were used for.
          </p>

          <article className="dino-facts-diet">
            <p>
              <span className="dino-facts-diet-bold">Diet:</span> herbivorous
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default DinoIndexFacts;
