import "./timeline.css";
import MockDinos from "../../assets/scraped-dinos.json";

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export default function TimeLineFilter({ selectedRange }) {
  const filteredDinos = MockDinos.filter((dino) => {
    const [rangeStart, rangeEnd] = selectedRange;
    return dino.start_mya >= rangeEnd && dino.end_mya <= rangeStart;
  });

  const groupedDinos = filteredDinos.reduce((acc, dino) => {
    const letter = dino.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(dino);
    return acc;
  }, {});

  return (
    <div>
      <section className="letter-grid-container">
        {alphabet.map((letter) => (
          <div key={letter} className="letter-group">
            <section id="alphabet-container">
              <h2 className="big-letter">{letter}</h2>
              <div className="dino-grid">
                {groupedDinos[letter] && groupedDinos[letter].length > 0 ? (
                  groupedDinos[letter].map((dino) => (
                    <div key={dino.name} className="dino-card">
                      <p className="dino-title">{dino.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-dinos"></p>
                )}
              </div>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}
