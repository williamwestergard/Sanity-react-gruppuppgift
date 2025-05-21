import React, { useState, useRef } from "react";
import dinos from "../../assets/db-with-img.json";
import "./DinoRPG.css";

const DINO_TYPES = [
  {
    key: "carnivore",
    label: "Meat Eater",
    desc: "Strong and fierce, loves meat!",
  },
  {
    key: "herbivore",
    label: "Vegetarian",
    desc: "Peaceful and tough, loves plants!",
  },
  { key: "omnivore", label: "Mixed", desc: "Adaptable and clever, eats both!" },
];

function getRandomDino(type) {
  // Optionally filter by type if your db supports it, else just random
  const idx = Math.floor(Math.random() * dinos.length);
  return dinos[idx];
}

function getRandomOpponent(playerDino) {
  let idx;
  do {
    idx = Math.floor(Math.random() * dinos.length);
  } while (dinos[idx].name === playerDino.name);
  return dinos[idx];
}

const MAX_HP = 10;

export default function DinoRPG() {
  const [dinoName, setDinoName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [dinoType, setDinoType] = useState(null);
  const [playerDino, setPlayerDino] = useState(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  // Battle state
  const [battleResult, setBattleResult] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [playerHp, setPlayerHp] = useState(MAX_HP);
  const [opponentHp, setOpponentHp] = useState(MAX_HP);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattling, setIsBattling] = useState(false);
  const [playerDmg, setPlayerDmg] = useState(null);
  const [opponentDmg, setOpponentDmg] = useState(null);

  // For clearing intervals
  const battleInterval = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (dinoName.trim()) {
      setRegistered(true);
    }
  }

  function handleTypeSelect(type) {
    setDinoType(type);
    const dino = getRandomDino(type);
    setPlayerDino(dino);
  }

  function startBattle() {
    setOpponent(getRandomOpponent(playerDino));
    setPlayerHp(MAX_HP);
    setOpponentHp(MAX_HP);
    setBattleLog([]);
    setBattleResult(null);
    setIsBattling(true);
    setPlayerDmg(null);
    setOpponentDmg(null);
  }

  // Auto-battle logic
  React.useEffect(() => {
    if (!isBattling || !opponent) return;

    if (playerHp <= 0 || opponentHp <= 0) {
      // End battle
      let result;
      if (playerHp > 0 && opponentHp <= 0) result = "win";
      else if (opponentHp > 0 && playerHp <= 0) result = "lose";
      else if (playerHp <= 0 && opponentHp <= 0) result = "draw";
      setBattleResult(result);

      // XP/level logic
      let gainedXp = result === "win" ? 10 : 5;
      let newXp = xp + gainedXp;
      let newLevel = level;
      if (newXp >= 10) {
        newLevel += Math.floor(newXp / 10);
        newXp = newXp % 10;
      }
      setXp(newXp);
      setLevel(newLevel);

      setIsBattling(false);
      setTimeout(() => {
        setPlayerDmg(null);
        setOpponentDmg(null);
      }, 600);
      return;
    }

    // Battle round
    battleInterval.current = setTimeout(() => {
      // Random damage 1-3
      const dmgToOpponent = Math.floor(Math.random() * 3) + 1;
      const dmgToPlayer = Math.floor(Math.random() * 3) + 1;

      setOpponentHp((hp) => Math.max(0, hp - dmgToOpponent));
      setPlayerHp((hp) => Math.max(0, hp - dmgToPlayer));
      setBattleLog((log) => [
        ...log,
        `You dealt ${dmgToOpponent} dmg, took ${dmgToPlayer} dmg.`,
      ]);
      setPlayerDmg(-dmgToPlayer);
      setOpponentDmg(-dmgToOpponent);

      // Clear floating dmg after short time
      setTimeout(() => {
        setPlayerDmg(null);
        setOpponentDmg(null);
      }, 700);
    }, 900);

    return () => clearTimeout(battleInterval.current);
    // eslint-disable-next-line
  }, [isBattling, playerHp, opponentHp, opponent]);

  function handleNextBattle() {
    setBattleResult(null);
    setOpponent(null);
    setPlayerHp(MAX_HP);
    setOpponentHp(MAX_HP);
    setBattleLog([]);
    setPlayerDmg(null);
    setOpponentDmg(null);
  }

  return (
    <div className="dino-rpg-container">
      <h2 className="pokemon-heading">Dino RPG</h2>
      {!registered ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name your dino:
            <input
              className="dino-rpg-input"
              type="text"
              value={dinoName}
              onChange={(e) => setDinoName(e.target.value)}
              maxLength={20}
              required
              style={{ marginLeft: "1rem", fontSize: "1.2rem" }}
            />
          </label>
          <button type="submit" style={{ marginLeft: "1rem" }}>
            Register
          </button>
        </form>
      ) : !dinoType ? (
        <div>
          <h3>
            Welcome, <span style={{ color: "#43a047" }}>{dinoName}</span>!
          </h3>
          <p>Choose your dino type:</p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            {DINO_TYPES.map((type) => (
              <button
                key={type.key}
                className="dino-type-btn"
                onClick={() => handleTypeSelect(type.key)}
                style={{
                  padding: "1.2rem 1.5rem",
                  borderRadius: "1rem",
                  border: "2px solid #234d20",
                  background: "#eaf7d0",
                  fontFamily: "inherit",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px #7fa86b inset",
                  minWidth: "120px",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#d2e7b2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#eaf7d0")
                }
              >
                {type.label}
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.95rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {type.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : !playerDino ? null : (
        <div>
          <h3>
            {dinoName} the{" "}
            <span style={{ color: "#43a047" }}>
              {DINO_TYPES.find((t) => t.key === dinoType).label}
            </span>
            !
          </h3>
          <div
            style={{
              margin: "2rem 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Player Dino */}
            <div
              style={{
                width: "48%",
                textAlign: "center",
                position: "relative",
              }}
            >
              <img
                src={
                  playerDino?.image ||
                  "https://via.placeholder.com/200x150?text=No+Image"
                }
                alt={playerDino?.name}
                style={{
                  width: "120px",
                  height: "90px",
                  objectFit: "contain",
                  border: "3px solid #234d20",
                  borderRadius: "1rem",
                  background: "#eaf7d0",
                  marginBottom: "0.5rem",
                }}
              />
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {playerDino?.name}
              </div>
              <div style={{ margin: "0.5rem 0" }}>
                <HPBar hp={playerHp} max={MAX_HP} />
                {playerDmg !== null && <FloatingDmg value={playerDmg} />}
              </div>
              <div style={{ fontSize: "0.95rem" }}>
                Level: {level} | XP: {xp}/10
              </div>
            </div>
            {/* Opponent Dino */}
            <div
              style={{
                width: "48%",
                textAlign: "center",
                position: "relative",
              }}
            >
              {opponent && (
                <>
                  <img
                    src={
                      opponent?.image ||
                      "https://via.placeholder.com/120x90?text=No+Image"
                    }
                    alt={opponent?.name}
                    style={{
                      width: "120px",
                      height: "90px",
                      objectFit: "contain",
                      border: "2px solid #234d20",
                      borderRadius: "0.7rem",
                      background: "#eaf7d0",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <div style={{ fontSize: "1.1rem" }}>{opponent?.name}</div>
                  <div style={{ margin: "0.5rem 0" }}>
                    <HPBar hp={opponentHp} max={MAX_HP} />
                    {opponentDmg !== null && (
                      <FloatingDmg value={opponentDmg} />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Battle log */}
          {battleLog.length > 0 && (
            <div
              style={{
                background: "#eaf7d0",
                border: "2px solid #234d20",
                borderRadius: "0.7rem",
                margin: "1rem auto",
                maxWidth: 340,
                fontFamily: "monospace",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                minHeight: "2.2rem",
              }}
            >
              {battleLog.slice(-2).map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
          {/* Battle controls */}
          {battleResult ? (
            <div>
              <h4>
                {battleResult === "win"
                  ? "You won!"
                  : battleResult === "lose"
                  ? "You lost!"
                  : "It's a draw!"}
              </h4>
              <button onClick={handleNextBattle}>Continue</button>
              <button onClick={startBattle} style={{ marginLeft: "1rem" }}>
                Battle Again
              </button>
            </div>
          ) : !isBattling ? (
            <button onClick={startBattle} style={{ marginTop: "1.5rem" }}>
              Battle!
            </button>
          ) : (
            <div style={{ marginTop: "1.5rem", color: "#234d20" }}>
              Battling...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// HP bar component
function HPBar({ hp, max }) {
  return (
    <div
      style={{
        background: "#b6d99a",
        border: "2px solid #234d20",
        borderRadius: "0.5rem",
        width: 90,
        height: 18,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#43a047",
          width: `${Math.max(0, (hp / max) * 100)}%`,
          height: "100%",
          transition: "width 0.3s",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: "center",
          fontSize: "1rem",
          color: "#234d20",
          fontWeight: "bold",
          lineHeight: "18px",
          textShadow: "0 1px #fff8",
        }}
      >
        {hp} / {max}
      </span>
    </div>
  );
}

// Floating damage text
function FloatingDmg({ value }) {
  return (
    <span
      style={{
        position: "absolute",
        left: "50%",
        top: "-18px",
        transform: "translateX(-50%)",
        color: value < 0 ? "#e53935" : "#43a047",
        fontWeight: "bold",
        fontSize: "1.2rem",
        animation: "floatDmg 0.7s linear",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {value}
      <style>
        {`
        @keyframes floatDmg {
          0% { opacity: 1; top: -18px; }
          100% { opacity: 0; top: -38px; }
        }
        `}
      </style>
    </span>
  );
}
