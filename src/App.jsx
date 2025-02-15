import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Card from "./components/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/FavoriteContext";
import Navbar from "./components/Navbar";
import "./styles/index.css"
import "./styles/App.css"
import Movie from "./pages/Movie";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
