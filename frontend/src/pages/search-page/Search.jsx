import { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import dinoData from "../../assets/db-with-img.json";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // To check if user has searched

  const handleSearch = () => {
    const filtered = dinoData.filter((dino) =>
      dino.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setHasSearched(true); // Set to true when user searches
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section className="search-page">
            <h1>Search Dinosaurs by Name</h1>
            <section className="search-controls">
              <input
                type="text"
                placeholder="Type a dinosaur name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
              </button>
            </section>
          </section>

          <section className="search-results">
            {results.length > 0
              ? results.map((dino, index) => (
                  <section key={index} className="dino-card">
                    <Link
                      to={`/dinosaurs-index/${encodeURIComponent(dino.name)}`}
                      className="dino-title"
                    >
                      <h2>{dino.name}</h2>
                    </Link>
                  </section>
                ))
              : hasSearched && <p>No dinosaurs found. </p> // If the user searched and nothing matched
            }
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
}

