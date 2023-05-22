import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/favicon.ico" alt="Favicon" className="mr-2" width={'25%'} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuToggle}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          {isLoggedIn ? (
            <ul className="navbar-nav ml-auto"> {/* Alineación a la derecha */}
              <li className="nav-item">
                <Link className="nav-link" to="/index">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showCountries">
                  Country
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showTeams">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showPlayers">
                  Player
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showLeagues">
                  League
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showRosters">
                  Roster
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showParticipants">
                  Participant
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto"> {/* Alineación a la derecha */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/index">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showCountries">
                  Country
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showTeams">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/showPlayers">
                  Player
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;