import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImg from "../assets/logo.png";
import searchImg from "../assets/search.png";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchUsers();
    checkLoginStatus();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://five5-mediocremovieslist-obr2.onrender.com/read");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://five5-mediocremovieslist-obr2.onrender.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const checkLoginStatus = () => {
    const loginStatus = sessionStorage.getItem("login");
    setIsLoggedIn(loginStatus === "true");
  };

  const handleFilterByUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://five5-mediocremovieslist-obr2.onrender.com/delete/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const filteredMovies = movies.filter((movie) =>
    movie.movieName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredMoviesByUser = selectedUser
    ? filteredMovies.filter((movie) => movie.created_by === selectedUser)
    : filteredMovies;

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
                  <button className="nav-button" onClick={handleLoginClick}>
                    Login
                  </button>
                  <button className="nav-button" onClick={handleSignupClick}>
                    Signup
                  </button>
                </>
              ) : (
                <>
                  <Link to="/form" className="nav-button">
                    Add-Entity
                  </Link>
                  <button className="nav-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="user-filter">
          <select value={selectedUser} onChange={handleFilterByUser}>
  <option value="">All Users</option>
  {[...new Set(users.map(user => user.created_by))].map((username) => (
    <option key={username} value={username}>
      {username}
    </option>
  ))}
</select>

          </div>
          <div className="card-container">
            {filteredMoviesByUser.map((movie) => (
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
                        <Link to={`/update/${movie._id}`}>
                          <button className="update-button">Update</button>
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
