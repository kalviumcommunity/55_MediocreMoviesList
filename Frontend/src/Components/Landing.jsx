import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      <div className='trans'></div>
      <div className='container'>
        <h1>Mediocre Big Budget Movies</h1>
        <p>Welcome to our site! Explore a collection of pathetic big-budget movies that offer little to no entertainment value and may leave you questioning your life choices.</p>
        <Link to="/home" className="explore-button">Explore Now</Link>
      </div>
    </div>
  );
}

export default Landing;
