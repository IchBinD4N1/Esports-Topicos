import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './IndexPage.css'; // Archivo CSS para estilos personalizados

import image1 from '../images/imagen1.jpg';
import image2 from '../images/imagen2.jpg';
import image3 from '../images/imagen3.jpg';

const IndexPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 2 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderImage = (index) => {
    if (index === 0) {
      return <img src={image1} alt="Imagen 1" />;
    } else if (index === 1) {
      return <img src={image2} alt="Imagen 2" />;
    } else if (index === 2) {
      return <img src={image3} alt="Imagen 3" />;
    }
  };

  return (
    <div className="index-page">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/team">Team</Link>
          </li>
          <li className="navbar-item">
            <Link to="/player">Player</Link>
          </li>
          <li className="navbar-item">
            <Link to="/league">League</Link>
          </li>
          <li className="navbar-item">
            <Link to="/rosters">Rosters</Link>
          </li>
          <li className="navbar-item">
            <Link to="/participantes">Participantes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/country">Country</Link>
          </li>
        </ul>
      </nav>
      <h1 className="page-title">Contenido de la página principal</h1>
      <div className="carousel">
        <div className="carousel-inner">
          {renderImage(currentImageIndex)}
        </div>
      </div>
      {/* Agrega aquí el contenido adicional de la página */}
    </div>
  );
};

export default IndexPage;