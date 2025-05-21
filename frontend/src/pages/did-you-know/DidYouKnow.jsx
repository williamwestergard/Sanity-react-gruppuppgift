import "./didyouknow.css";
import pegomastaxImage from '../../assets/pegomastax.webp';
import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
const funFacts = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section className="DYK">
            <h2>Did You Know?</h2>
            <ul>
              <li>
                Some dinosaurs had feathers, even though they couldn't fly.
              </li>
              <li>
                The word dinosaur comes from the Greek language. Deinos means
                'terrible' while sauros means 'lizard'. So dinosaur can be
                directly translated to 'terrible lizard.'
              </li>
              <li>
                Baby T-rexes looked like very skinny turkeys and were covered in
                a coat of downy feathers.
              </li>
              <li>
                The biggest dinosaur bone ever found was a backbone, that
                weighed more than a tank, one ton.
              </li>
              <li>
                Scientists think that some large dinosaurs like the Apatosaurus
                lived as long as 300 years.
              </li>
              <li>Dinosaur fossils have been found on all seven continents.</li>
              <li>
                A dinosaur called the Pegomastax (illustrated below) is one of the weirdest
                dinosaurs known. Described as a cross between a parrot and
                porcupine, it had a beak with teeth that sharpened themselves
                against each other.
              </li>
              <li>
                Dinosaurs often swallowed large rocks. These rocks stayed in the
                stomach and helped them grind up food.
              </li>
              <li>
                Dinosaurs that lived near water often left the best fossils.
              </li>
              <li>
                The biggest hunter was the Spinosaurus "spine lizard". It was up
                to 15 m long.
              </li>
            </ul>
            <img
              src={pegomastaxImage}
              alt="Pegomastax Dinosaur"
              style={{ display: 'block', margin: '2rem auto 0', maxWidth: '300px' }}
            />
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default funFacts;
