import "../styles/Card.css";

function Card({ movie }) {
  function onFavoriteClick() {
    alert("Clicked!");
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src="{movie.url}" /*alt="{movie.title}"*/ />
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onFavoriteClick}>
            ❤️
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <h3>{movie.releaseDate}</h3>
      </div>
    </div>
  );
}

export default Card;
