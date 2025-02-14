import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Card from "./components/Card";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/FavoriteContext";
import Navbar from "./components/Navbar";
import "./styles/index.css"
import "./styles/App.css"

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
