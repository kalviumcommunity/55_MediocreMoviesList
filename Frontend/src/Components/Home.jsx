import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import searchImg from "../assets/search.png";
import axios from "axios";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchMovies();
    checkLoginStatus();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://mediocre-movies.onrender.com/read");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const checkLoginStatus = () => {
    const loginStatus = sessionStorage.getItem("login");
    setIsLoggedIn(loginStatus === "true");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://mediocre-movies.onrender.com/delete/${id}`, {
        method: "DELETE",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    setIsLoggedIn(false);
    // You can use Link for navigation
  };

  const filteredMovies = movies.filter((movie) =>
    movie.movieName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="bg-img"></div>
      <div className="Home">
        <div className="trans">
          <div className="navbar">
            <div className="navbar-brand">
              <Link to="/">
                <img src={logoImg} alt="logo" />
              </Link>
              <h2>Mediocre Movies</h2>
            </div>
            <div className="search-bar">
              <form className="input-group">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">
                  <img src={searchImg} alt="search" />
                </button>
              </form>
            </div>
            <div className="navbar-links">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="nav-button">
                    Login
                  </Link>
                  <button className="nav-button" disabled>
                    Add-Entity
                  </button>
                  <Link to="/signup" className="nav-button">
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/insert" className="nav-button">
                    Add-Entity
                  </Link>
                  <button className="nav-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="card-container">
            {filteredMovies.map((movie) => (
              <div className="card" key={movie._id}>
                <img src={movie.img} alt="movie poster" width="250px" />
                <div className="card-info">
                  <h2>{movie.movieName}</h2>
                  <p>
                    <strong>Release Date:</strong> {movie.releaseDate}
                  </p>
                  <p>
                    <strong>Industry:</strong> {movie.industry}
                  </p>
                  <p>
                    <strong>Director:</strong> {movie.director}
                  </p>
                  <p>
                    <strong>Budget:</strong> {movie.budget}
                  </p>
                  <p>
                    <strong>IMDB Rating:</strong> {movie.imdbRating}
                  </p>
                  <p>
                    <strong>Rotten Tomatoes:</strong>{" "}
                    {movie.rottenTomatoesRating}
                  </p>
                  <p>
                    <strong>Has Sequel:</strong>{" "}
                    {movie.hasSequel ? "TRUE" : "FALSE"}
                  </p>
                  <div className="card-buttons">
                    {isLoggedIn && (
                      <>
                        <Link to={`/update/${movie._id}`} className="update-button">
                          Update
                        </Link>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(movie._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
