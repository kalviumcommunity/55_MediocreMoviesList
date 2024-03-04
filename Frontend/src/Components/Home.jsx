import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import searchImg from "../assets/search.png";
import "./Home.css";

function Home() {
  return (
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
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="card-container">
          <div className="card">
            <img
              src="https://m.media-amazon.com/images/M/MV5BOTQ5ZjAxYWEtOWQxOC00MDg3LWEyYmUtOGIyYjk1MjgyNWNlXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg"
              alt="movie poster"
              width="250px"
            />
            <div className="card-info">
              <h2>Adipurush</h2>
              <p><strong>Release Date:</strong> June 16, 2023</p>
              <p><strong>Industry:</strong> Bollywood</p>
              <p><strong>Director:</strong> Om Raut</p>
              <p><strong>Budget:</strong> ₹700 crore</p>
              <p><strong>IMDB Rating:</strong>37%</p>
              <p><strong>Rotten Tomatoes:</strong> N/A</p>
              <p><strong>Has Sequel:</strong> FALSE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
