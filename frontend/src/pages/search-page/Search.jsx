import { useState } from "react";
import "./search.css";
import Navbar from "../../components/navbar/Navbar";
import dinoData from "../../assets/scraped-dinos.json";

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
      <Navbar />
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

        <section className="search-results">
          {results.length > 0 ? (
            results.map((dino, index) => (
              <section key={index} className="dino-card">
                <h2>{dino.name}</h2>
              </section>
            ))
          ) : (
            // If the user searched and nothing matched
            query && <p>No dinosaurs found.</p>
          )}
        </section>
      </section>
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
