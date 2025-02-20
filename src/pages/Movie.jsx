import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../services/api";
import "../styles/Movie.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);

        const text = await response.text(); // Read response as text first
        if (!text) throw new Error("Empty response from server");

        const data = JSON.parse(text); // Convert to JSON if it's not empty
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  console.log(movie);
  console.log(movie.tagline);

  return (
    <div className="movieInfo">
      <div className="movieBack">
        <img
          className="backDrop"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt=""
        />
        <div className="blur"></div>
      </div>
      <div className="infoWrapper mainInfo" id="header">
        <div className="posterWrapper">
          <img
            className="moviePoster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="{movie.title}"
          />
        </div>
        <div className="infoWrapper rightSide">
          <a className="movieTitle">{movie.title}</a>
          <p className="releaseDate">
            {movie.status} {formatDate(movie.release_date)},{" "}
            {movie.origin_country}
          </p>
          <a className="movieTagline">
            {movie.tagline ? (
              <p className="movieTagline">{movie.tagline}</p>
            ) : null}
          </a>
        </div>
      </div>

      <div className="infoWrapper">
        <p className="movieDetails">
          <strong>Genres:</strong>{" "}
          {movie.genres?.map((g) => g.name).join(", ") || "Unknown"}
        </p>
        <p className="movieDetails">
          <strong>Description:</strong> {movie.overview}
        </p>

        <p className="movieDetails">
          <strong>Rating:</strong> {movie.vote_average}
        </p>
      </div>
    </div>
  );
}

export default Movie;
