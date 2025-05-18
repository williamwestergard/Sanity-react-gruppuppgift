import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import SlideShow from "./components/slideshow/SwiperSlider";
import DinoPromo from "./assets/dinosaur-promo.jpg";
import DidYouKnowCard from "./components/did-you-know-card/DidYouKnowCard";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section id="startpage-content">
            <SlideShow />

            <section className="promo-image-and-did-you-know-card">
              <Link to="/dinosaurs-index">
                <img
                  className="dino-promo-image"
                  src={DinoPromo}
                  alt="An image of a T-rex"
                />
              </Link>
              <DidYouKnowCard />
            </section>
          </section>
        </main>
      </section>

      <Footer />
    </>
  );
}

export default App;
