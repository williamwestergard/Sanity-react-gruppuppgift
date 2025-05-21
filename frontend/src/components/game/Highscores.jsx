import React, { useState, useEffect } from 'react';
import { client } from '../../sanityClient';
import './Highscores.css';

export default function Highscores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        setError(null);
        const query = `*[_type == "dinoRpgPlayer" && defined(wins)] | order(wins desc) [0...10] {
          dinoName,
          wins,
          losses,
          level,
          isDead
        }`;
        const results = await client.fetch(query);
        setScores(results || []);
      } catch (err) {
        console.error("Failed to fetch highscores:", err);
        setError("Failed to load highscores");
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h3>Loading Highscores...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h3>Highscores</h3>
        <div style={{ 
          background: "rgba(229, 57, 53, 0.2)", 
          padding: "1rem", 
          borderRadius: "1rem",
          marginTop: "1rem"
        }}>
          {error}
        </div>
      </div>
    );
  }

  // Split scores into two columns
  const leftColumn = scores.slice(0, 5);
  const rightColumn = scores.slice(5, 10);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Top 10 Dinosaurs</h3>
      <div style={{ 
        background: "rgba(0,0,0,0.2)", 
        padding: "1rem", 
        borderRadius: "1rem",
        display: "flex",
        gap: "1rem",
        justifyContent: "center"
      }}>
        {scores.length === 0 ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            No scores yet. Be the first to play!
          </div>
        ) : (
          <>
            {/* Left Column */}
            <div style={{ flex: 1, maxWidth: "300px" }}>
              {leftColumn.map((score, index) => (
                <div 
                  key={`${score.dinoName}-${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    background: index === 0 ? "rgba(255,215,0,0.2)" : "transparent",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                    opacity: score.isDead ? 0.7 : 1
                  }}
                >
                  <span>
                    #{index + 1} {score.dinoName} 
                    {score.isDead && <span style={{ marginLeft: "0.5rem" }}>💀</span>}
                  </span>
                  <span>
                    Lvl {score.level || 1} | W: {score.wins || 0} L: {score.losses || 0}
                  </span>
                </div>
              ))}
            </div>
            {/* Right Column */}
            <div style={{ flex: 1, maxWidth: "300px" }}>
              {rightColumn.map((score, index) => (
                <div 
                  key={`${score.dinoName}-${index + 5}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    background: "transparent",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                    opacity: score.isDead ? 0.7 : 1
                  }}
                >
                  <span>
                    #{index + 6} {score.dinoName} 
                    {score.isDead && <span style={{ marginLeft: "0.5rem" }}>💀</span>}
                  </span>
                  <span>
                    Lvl {score.level || 1} | W: {score.wins || 0} L: {score.losses || 0}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 