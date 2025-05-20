import { useState, useEffect } from "react";
import "./dinosaursindex.css";
import Navbar from "../../components/navbar/Navbar";

import TimeLineFilter from "../../components/timeline-filter/TimeLineFilter.jsx";
import TimeLineSlider from "../../components/timeline-filter/TimeLineSlider.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

import DinoTimePeriodsImage from "../../assets/dino-timeline-image.png";

const DinosaursIndex = () => {
  const [selectedRange, setSelectedRange] = useState([160, 65]);

  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      const distanceFromBottom = bodyHeight - (scrollY + windowHeight);

      // Switch to absolute when you reach bottom trigger zone
      setIsFixed(distanceFromBottom > 300); // stay fixed unless near bottom
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <section id="dino-index-content">
          <section className="index-left-side-content">
            <h1 className="dino-index-title">Dinosaurs Index</h1>

            <TimeLineFilter selectedRange={selectedRange} />
          </section>
          <section
            className={`index-right-side-content ${
              isFixed ? "fixed" : "absolute"
            }`}
          >
            <TimeLineSlider
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />
          </section>
        </section>

        <img
          className="dino-time-periods-image"
          src={DinoTimePeriodsImage}
          alt="An image of dinosaurs walking towards the right"
        />
      </section>
    </>
  );
};

export default DinosaursIndex;
