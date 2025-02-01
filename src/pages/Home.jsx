import Card from "../components/Card";
import { useState } from "react";
import "../styles/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    { id: 1, title: "Jhon Wick", releaseDate: "2020" },
    { id: 2, title: "Cars", releaseDate: "2006" },
    { id: 3, title: "ВЭНАМ", releaseDate: "2024" },
  ];

  const handleSearch = () => {
    e.preventDefault();
    alert(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          placeholder="Search for movies..."
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="searchButton">
          Search
        </button>
      </form>
      <div className="movieGrid">
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
