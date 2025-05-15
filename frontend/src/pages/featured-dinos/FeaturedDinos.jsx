import "./featureddinos.css";
import Navbar from "../../components/navbar/Navbar";
import FeaturedDinoImage from "./img/t-rex.png";
import FeaturedDinoImageBg from "./img/featured-dino-bg.png";

const FeaturedDinos = () => {
  return (
    <>
      <Navbar />
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
            <span className="featured-dino-discovery-year"> 1874</span>
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
            Tyrannosaurus
            <span className="featured-dino-name-big-bold">Rex</span>
          </h1>
          <p className="featured-dino-type">
            <span className="feature-dino-type-border">Type</span> Theropod
          </p>
        </section>

        <article className="feature-dino-information">
          <h2 className="feature-dino-information-header">The Classic</h2>
          <p className="eature-dino-information-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
            voluptas sequi et quaerat repellendus corrupti saepe inventore
            necessitatibus.
            <br /> <br />
            Mollitia esse ducimus cum quae unde suscipit, aperiam exercitationem
            est voluptatibus omnis.
          </p>
        </article>
        <span className="featured-dino-bottom-line"></span>
      </main>
    </>
  );
};

export default FeaturedDinos;
