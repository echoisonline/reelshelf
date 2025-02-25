import Card from "../components/Card";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { data } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Card.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentMovies, setRecentMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("recentMovies")) || [];
    setRecentMovies(storedMovies);
  }, []);

  const clearRecentlyViewed = () => {
    localStorage.removeItem("recentMovies"); // Удаляем из localStorage
    setRecentMovies([]); // Очищаем состояние
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to find a movie...");
    } finally {
      setLoading(false);
    }
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
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {!searchQuery && (
            <>
              <h2 className="trending">Trending now</h2>
              <div className="scrollContainer">
                {movies.map((movie) => (
                  <Card movie={movie} key={movie.id} />
                ))}
              </div>

              {recentMovies.length > 0 && (
                <>
                  <div className="recentlyViewedHeader">
                    <h2 className="recentlyViewed">Recently Viewed</h2>
                    <button
                      className="clearButton"
                      onClick={clearRecentlyViewed}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="scrollContainer">
                    {recentMovies.map((movie) => (
                      <Card movie={movie} key={movie.id} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {searchQuery && (
            <div className="searchResults">
              {movies.length > 0 ? (
                movies.map((movie) => <Card movie={movie} key={movie.id} />)
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
