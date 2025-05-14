import { useState } from "react";
import { Slider } from "@mui/material";
import "./DinoTimelineFilter.css";

const mockDinos = [
  {
    name: "Tyrannosaurus Rex",
    period: "Late Cretaceous",
    start_mya: 68,
    end_mya: 66,
    diet: "Carnivore",
  },
  {
    name: "Triceratops",
    period: "Late Cretaceous",
    start_mya: 68,
    end_mya: 66,
    diet: "Herbivore",
  },
  {
    name: "Stegosaurus",
    period: "Late Jurassic",
    start_mya: 155,
    end_mya: 150,
    diet: "Herbivore",
  },
  {
    name: "Velociraptor",
    period: "Late Cretaceous",
    start_mya: 75,
    end_mya: 71,
    diet: "Carnivore",
  },
  {
    name: "Brachiosaurus",
    period: "Late Jurassic",
    start_mya: 154,
    end_mya: 150,
    diet: "Herbivore",
  },
];

export default function DinoTimelineFilter() {
  const [selectedRange, setSelectedRange] = useState([160, 65]);

  const filteredDinos = mockDinos.filter((dino) => {
    const [rangeStart, rangeEnd] = selectedRange;
    return dino.start_mya >= rangeEnd && dino.end_mya <= rangeStart;
  });

  return (
    <div>
      <div className="dino-container">
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

      {filteredDinos.length > 0 ? (
        <div className="dino-grid">
          {filteredDinos.map((dino) => (
            <div key={dino.name} className="dino-card">
              <h2 className="dino-title">{dino.name}</h2>
              <p className="dino-period">{dino.period}</p>
              <p className="dino-info">
                <strong>Lived:</strong> {dino.start_mya}–{dino.end_mya} MYA
              </p>
              <p className="dino-info">
                <strong>Diet:</strong> {dino.diet}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No dinosaurs found in this time range.</p>
      )}
    </div>
  );
}
