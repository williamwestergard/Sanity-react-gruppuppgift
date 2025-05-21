import React, { useState } from "react";
import dinos from "../../assets/db-with-img.json";
import "./GuessThatDino.css";

function getRandomOptions(correct, all, n = 3) {
  const others = all.filter((d) => d.name !== correct.name);
  const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, n - 1);
  const options = [...shuffled, correct].sort(() => 0.5 - Math.random());
  return options;
}

// Helper to get silhouette path
function getSilhouettePath(name) {
  if (!name) return null;
  // Remove problematic characters for file names
  const safeName = name.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/ /g, "_");
  return `/src/assets/dino_silhouettes/${safeName}.png`;
}

export default function GuessThatDino() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const dino = dinos[round % dinos.length];
  const options = getRandomOptions(dino, dinos);

  const silhouettePath = getSilhouettePath(dino.name);

  function handleGuess(option) {
    setSelected(option);
    setShowResult(true);
    if (option.name === dino.name) setScore((s) => s + 1);
  }

  function next() {
    setShowResult(false);
    setSelected(null);
    setRound((r) => r + 1);
  }

  return (
    <main className="dino-game-container">
      <div className="guess-dino-game">
        <h2 className="pokemon-heading">Guess That Dino!</h2>
        <div
          className="dino-image-silhouette"
          style={{
            background: `url('/src/components/game/hq720.jpg') center/cover no-repeat`,
            width: 320,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem auto",
            borderRadius: "1rem",
            position: "relative",
          }}
        >
          <div className="crossout"></div>
          <img
            src={silhouettePath}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
            alt="Guess the dinosaur"
            className="dino-silhouette"
            style={{ maxHeight: 180, maxWidth: 300 }}
          />
        </div>
        <div className="options">
          {options.map((opt) => (
            <button
              key={opt.name}
              className={
                showResult
                  ? opt.name === dino.name
                    ? "correct"
                    : selected && opt.name === selected.name
                    ? "wrong"
                    : ""
                  : ""
              }
              onClick={() => !showResult && handleGuess(opt)}
              disabled={showResult}
            >
              {opt.name}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="result">
            {selected.name === dino.name
              ? "Correct!"
              : `Wrong! It was ${dino.name}.`}
            <button onClick={next}>Next</button>
          </div>
        )}
        <div className="score">Score: {score}</div>
      </div>
    </main>
  );
}
