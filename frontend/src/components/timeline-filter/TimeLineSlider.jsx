import { Slider } from "@mui/material";
import "./timeline.css";

export default function TimeLineSlider({ selectedRange, setSelectedRange }) {
  return (
    <div className="dino-container">
      <section id="timeline-container">
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Sort by Time Period
          </h1>
          <p className="text-lg mb-8 text-center text-gray-700">
            Use the slider below to explore which dinosaurs lived during
            specific periods of time.
          </p>
        </div>
      </section>

      <p className="dino-description">
        Showing dinosaurs from <strong>{selectedRange[0]}</strong> to{" "}
        <strong>{selectedRange[1]}</strong> million years ago.
      </p>
      <Slider
        value={selectedRange}
        onChange={(e, newValue) =>
          setSelectedRange(newValue.sort((a, b) => b - a))
        }
        valueLabelDisplay="auto"
        min={65}
        max={160}
        step={1}
        disableSwap
      />
    </div>
  );
}
