import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../services/api";
import "../styles/Movie.css";
import CircularRating from "../components/CircularRating.jsx";

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

        const text = await response.text();
        if (!text) throw new Error("Empty response from server");

        const data = JSON.parse(text);
        setMovie(data);
        saveToRecentlyViewed(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const saveToRecentlyViewed = (movie) => {
    if (!movie) return;

    let viewedMovies = JSON.parse(localStorage.getItem("recentMovies")) || [];

    if (!viewedMovies.some((m) => m.id === movie.id)) {
      viewedMovies = [movie, ...viewedMovies.slice(0, 9)];
      localStorage.setItem("recentMovies", JSON.stringify(viewedMovies));
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  console.log(movie);
  console.log(movie.tagline);

  const formatRuntime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  return (
    <div className="movieInfo">
      <div className="mainInfo">
        <div className="header">
          <div className="movieBack">
            <div
              className="backDrop"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
              }}
            >
              <div className="blurBack">
                <div className="blurLeft"></div>
              </div>
            </div>
          </div>
          <div className="headerWrapper">
            <div className="posterWrapper">
              <img
                className="moviePoster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="{movie.title}"
              />
              <div className="scoreWrapper">
                <p className="movieRating">
                  <CircularRating rating={movie.vote_average} />
                  <span>User Score</span>
                </p>
              </div>
            </div>
            <div className="movieDetailsContainer">
              <h1 className="movieTitle">{movie.title}</h1>
              {movie.tagline && <p className="movieTagline">{movie.tagline}</p>}

              <div className="movieDetailsGrid">
                <div className="detailsColumn">
                  <p className="movieGenres">
                    <strong>Genres</strong> <br />
                    {movie.genres?.map((g) => g.name).join(", ") || "Unknown"}
                  </p>
                  <p className="releaseDate">
                    <strong>{movie.status}</strong> <br />
                    {formatDate(movie.release_date)}, {movie.origin_country}
                  </p>
                  <div className="boxOffice">
                    {movie.budget > 0 && (
                      <p>
                        <strong>Budget</strong> <br />
                        {movie.budget.toLocaleString()}$
                      </p>
                    )}
                    {movie.revenue > 0 && (
                      <p>
                        <strong>Revenue</strong> <br />
                        {movie.revenue.toLocaleString()}$
                      </p>
                    )}
                  </div>
                </div>

                <div className="detailsColumn">
                  <p className="runtime">
                    <strong>Runtime</strong> <br />
                    {formatRuntime(movie.runtime)}
                  </p>
                  <p className="movieCountries">
                    <strong>Production Countries</strong> <br />
                    {movie.production_countries
                      ?.map((g) => g.name)
                      .join(", ") || "Unknown"}
                  </p>
                  <p className="movieProds">
                    <strong>Production Companies</strong> <br />
                    {movie.production_companies
                      ?.map((g) => g.name)
                      .join(", ") || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="movieDetailsContainer">
          <div className="movieOverview">
            <p>{movie.overview}</p>
          </div>
          <div className="movieExtraInfo"></div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
