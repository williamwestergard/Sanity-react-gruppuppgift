import "./timeline.css";
import MockDinos from "./MockDinos.jsx";

export default function TimeLineFilter({ selectedRange }) {
  const filteredDinos = MockDinos.filter((dino) => {
    const [rangeStart, rangeEnd] = selectedRange;
    return dino.start_mya >= rangeEnd && dino.end_mya <= rangeStart;
  });

  return (
    <div>
      {filteredDinos.length > 0 ? (
        <div className="dino-grid">
          {filteredDinos.map((dino) => (
            <div key={dino.name} className="dino-card">
              <h2 className="dino-title">{dino.name}</h2>
              {/* <p className="dino-period">{dino.period}</p>
              <p className="dino-info">
                <strong>Lived:</strong> {dino.start_mya}–{dino.end_mya} MYA
              </p>
              <p className="dino-info">
                <strong>Diet:</strong> {dino.diet}
              </p> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No dinosaurs found in this time range.</p>
      )}
    </div>
  );
}
