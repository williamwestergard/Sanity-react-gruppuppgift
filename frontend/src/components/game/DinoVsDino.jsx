import React, { useState } from "react";
import dinos from "../../assets/db-with-img.json";
import "./DinoVsDino.css";

function getRandomVotes() {
  // Generate random votes for each dino (between 10 and 100)
  const v0 = Math.floor(Math.random() * 90) + 10;
  const v1 = Math.floor(Math.random() * 90) + 10;
  return [v0, v1];
}

function getTwoRandomDinos() {
  let idx1 = Math.floor(Math.random() * dinos.length);
  let idx2;
  do {
    idx2 = Math.floor(Math.random() * dinos.length);
  } while (idx2 === idx1);
  return [dinos[idx1], dinos[idx2]];
}

export default function DinoVsDino() {
  const [pair, setPair] = useState(getTwoRandomDinos());
  const [votes, setVotes] = useState(getRandomVotes());
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleVote(idx) {
    if (voted) return;
    const newVotes = [...votes];
    newVotes[idx]++;
    setVotes(newVotes);
    setVoted(true);
    setSelected(idx);
  }

  function nextMatchup() {
    setPair(getTwoRandomDinos());
    setVotes(getRandomVotes());
    setVoted(false);
    setSelected(null);
  }

  const totalVotes = votes[0] + votes[1];
  const percent0 = totalVotes ? Math.round((votes[0] / totalVotes) * 100) : 50;
  const percent1 = totalVotes ? Math.round((votes[1] / totalVotes) * 100) : 50;

  return (
    <div className="dino-vs-dino-game">
      <h2 className="pokemon-heading">Dino vs Dino!</h2>
      <div className="dino-vs-container">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={
              "dino-vs-card" +
              (voted ? (selected === i ? " chosen" : " voted") : "")
            }
            onClick={() => handleVote(i)}
            style={{ cursor: voted ? "default" : "pointer" }}
          >
            <img
              src={
                pair[i].image ||
                "https://via.placeholder.com/200x150?text=No+Image"
              }
              alt={pair[i].name}
              className="dino-vs-img"
            />
            <div className="dino-vs-name">{pair[i].name}</div>
          </div>
        ))}
      </div>
      <div className="dino-vs-bar-container">
        <div
          className="dino-vs-bar green"
          style={{
            width: `${percent0}%`,
          }}
        >
          <span className="dino-vs-bar-label left">{percent0}%</span>
        </div>
        <div
          className="dino-vs-bar red"
          style={{
            width: `${percent1}%`,
          }}
        >
          <span className="dino-vs-bar-label right">{percent1}%</span>
        </div>
      </div>
      {voted && (
        <button className="dino-vs-next" onClick={nextMatchup}>
          Next Matchup
        </button>
      )}
    </div>
  );
}
