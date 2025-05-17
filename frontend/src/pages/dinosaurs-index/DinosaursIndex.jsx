import { useState } from "react";
import "./dinosaursindex.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";

import TimeLineFilter from "../../components/timeline-filter/TimeLineFilter.jsx";
import TimeLineSlider from "../../components/timeline-filter/TimeLineSlider.jsx";

const DinosaursIndex = () => {
  const [selectedRange, setSelectedRange] = useState([160, 65]);
  return (
    <>
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
      </section>
      <Footer />
    </>
  );
};

export default DinosaursIndex;
