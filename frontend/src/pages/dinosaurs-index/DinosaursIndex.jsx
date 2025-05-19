import { useState } from "react";
import "./dinosaursindex.css";
import Navbar from "../../components/navbar/Navbar";

import TimeLineFilter from "../../components/timeline-filter/TimeLineFilter.jsx";
import TimeLineSlider from "../../components/timeline-filter/TimeLineSlider.jsx";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

import DinoTimePeriodsImage from "../../assets/dino-timeline-image.png";

const DinosaursIndex = () => {
  const [selectedRange, setSelectedRange] = useState([160, 65]);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section id="dino-index-content">
            <section className="index-left-side-content">
              <h1>Dinosaurs Index</h1>

              <TimeLineFilter selectedRange={selectedRange} />
            </section>
            <section className="index-right-side-content">
              <TimeLineSlider
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
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

export default DinosaursIndex;
