import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import searchImg from "../assets/search.png";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/read");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });
      fetchMovies(); 
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

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
                <input type="text" placeholder="Search" />
                <button type="submit">
                  <img src={searchImg} alt="search" />
                </button>
              </form>
            </div>
            <div className="navbar-links">
              <Link to="/Home">Home</Link>
              <Link to="/Form">Add-Entity</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="card-container">
            {movies.map((movie) => (
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
                    <Link to={`/update/${movie._id}`}>
                      <button className="update-button">Update</button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
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
