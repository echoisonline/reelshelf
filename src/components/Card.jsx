import "../styles/Card.css";
import { useMovieContext } from "../contexts/FavoriteContext";
import { Link } from "react-router-dom";
import fallbackImage from "../assets/fallback.png";

function Card({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallbackImage;

  return (
    <>
      <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="movie-card">
          <div className="movie-poster">
            <img src={posterUrl} alt={movie.title} />
            <div className="movie-overlay">
              <button
                className={`favorite-btn ${favorite ? "active" : ""}`}
                onClick={onFavoriteClick}
              >
                ❤︎
              </button>
            </div>
            <div className="movie-info">
              <h3 className="title">{movie.title}</h3>
              <h3 className="release-date">
                {movie.release_date?.split("-")[0]}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
