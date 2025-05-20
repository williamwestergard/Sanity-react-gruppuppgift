import { Slider } from "@mui/material";
import "./timeline.css";

export default function TimeLineSlider({ selectedRange, setSelectedRange }) {
  return (
    <div className="sort-by-time-period-container">
      <section id="timeline-container">
        <div>
          <h2 className="sort-by-time-period">
            Sort by{" "}
            <span className="sort-by-time-period-bold">Time Period</span>
          </h2>
        </div>
      </section>

      <p className="sort-by-time-period-desc">
        Showing dinosaurs from:
        <br />
        <section className="sort-by-time-period-numbers">
          <strong>{selectedRange[0]}</strong> -{" "}
          <strong>{selectedRange[1]}</strong>
        </section>
        <span className="sort-by-time-period-years">million years ago.</span>
      </p>
      <Slider
        className="sort-by-time-period-slider"
        sx={{
          color: "#6b9d7e",
        }}
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
