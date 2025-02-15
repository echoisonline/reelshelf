import { useMovieContext } from "../contexts/FavoriteContext";
import Card from "../components/Card";
import "../styles/Favorites.css"

function Favorites() {
  const {favorites} = useMovieContext();

  if (favorites != 0){
    return (
      <div className="favorites">
        <h2 className="favoritesText">Your Favorites</h2>
        <div className="movieGrid">
          {favorites.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="favoritesEmpty">
      <h2>No Favorites Movies Yet</h2>
      <p>Start adding movies to your favorites and they wll appear here.</p>
    </div>
  );
}

export default Favorites;
