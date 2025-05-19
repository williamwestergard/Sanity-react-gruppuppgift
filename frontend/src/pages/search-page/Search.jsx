import { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer.jsx";
import dinoData from "../../assets/scraped-dinos.json";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = dinoData.filter((dino) =>
      dino.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className="page-wrapper">
        <main id="main-content">
          <section className="search-page">
            <h1>Search Dinosaurs by Name</h1>
            <div className="search-controls">
              <input
                type="text"
                placeholder="Type a dinosaur name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
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
              : // If the user searched and nothing matched
                query && <p>No dinosaurs found.</p>}
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
}

// const Search = () => {
//   return (
//     <>
//       <Navbar />
//       <h1>Search</h1>
//       <p>Search for your favorite dinosaur.</p>
//     </>
//   );
// };

// export default Search;
