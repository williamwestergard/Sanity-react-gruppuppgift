import "./DinoTimelineFilter.css";
import Navbar from "../../components/navbar/Navbar";
import DinoTimelineFilter from "../time-periods/DinoTimelineFilter";

export default function TimePeriod() {
  return (
    <>
      <Navbar />
      <section id="timeline-container">
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Dinosaurs by Time Period
          </h1>
          <p className="text-lg mb-8 text-center text-gray-700">
            Use the slider below to explore which dinosaurs lived during
            specific periods of time.
          </p>

          <DinoTimelineFilter />
        </div>
      </section>
    </>
  );
}
