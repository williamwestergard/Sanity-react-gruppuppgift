import "../about-us/aboutus.css";
import Navbar from "../../components/navbar/Navbar";
import Velociraptor from "../../assets/velociraptor.png";
import Trex from "../../assets/t-rex.png";
import Dilophosaurus from "../../assets/dilophosaurus.png";
import Pteranodon from "../../assets/pteranodon.png";
import DinoEggs from "../../assets/dinosaur-eggs.png";
import Fossil from "../../assets/fossil.png";

const aboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="about-us">
        <h2 className="title">About Us</h2>
        <h3>
          <img src={Trex} alt="Tyrannosaurus Rex" className="creator-icon" />
          Madelen:
        </h3>
        <p>Front end developer student and dinosaur enthusiast!</p>
        <h3>
          <img
            src={Dilophosaurus}
            alt="Dilophosaurus"
            className="creator-icon"
          />
          William:
        </h3>
        <p>Front end developer and dino-expert according to no one.</p>
        <h3>
          <img src={Velociraptor} alt="Velociraptor" className="creator-icon" />
          Daniel:
        </h3>
        <p>Front end developer and a big fan of the velociraptor.</p>
        <h3>
          <img src={Pteranodon} alt="Pteranodon" className="creator-icon" />
          Simon:
        </h3>
        <p>Front end developer and knowledgable with dinosaurs and Python.</p>
        <img src={DinoEggs} alt="Dinosaur Eggs" className="new-topic-icon" />
        <h2>Our vision for the website</h2>
        <p>
          We wanted to create a unique dinosaur website that featured a little
          bit of everything.
        </p>
        <p>
          Facts, fun, gamification of dinosaurs and a nice spin on
          interactiveness for the visitor.
        </p>
        <p>
          If you're looking for a dinosaur page that makes learning more fun,
          you've come to the right place!
        </p>
        <img src={Fossil} alt="Dinosaur Fossil" className="new-topic-icon" />
        <h2>Our Socials</h2>
        <p>Madelen:</p>
        <a href="https://github.com/MadelenNilsen">GitHub</a>
        <a href="mailto: madelennilsen98@gmail.com">Mail</a>
        <p>William:</p>
        <a href="https://github.com/williamwestergard">GitHub</a>
        <p>Daniel:</p>
        <a href="https://github.com/Luckmore83">GitHub</a>
        <a href="mailto: daaksve@gmail.com">Mail</a>
        <p>Simon:</p>
        <a href="https://github.com/KarlSimonB">GitHub</a>
      </section>
    </>
  );
};

export default aboutUs;
