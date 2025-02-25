import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import Card from "../components/Card";
import "../styles/SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="searchResultsPage">
      <h2>Search results for: "{query}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="searchResultsGrid">
        {movies.length > 0
          ? movies.map((movie) => <Card key={movie.id} movie={movie} />)
          : !loading && <p>No movies found.</p>}
      </div>
    </div>
  );
}

export default SearchResults;
