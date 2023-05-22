import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './IndexPage.css'; // Archivo CSS para estilos personalizados

import image1 from '../images/imagen7.jpg';
import image2 from '../images/imagen8.jpg';
import image3 from '../images/imagen9.jpg';
import image4 from '../images/imagen4.jpg';
import image5 from '../images/imagen5.jpg';
import image6 from '../images/imagen6.jpg';

const IndexPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const news = [
    {
      title: 'New Champion Released',
      description: 'Discover the latest champion to join the League of Legends roster!',
      image: image5,
      link: 'https://www.leagueoflegends.com/es-es/champions/milio/',
    },
    {
      title: 'Upcoming Tournament',
      description: "Get ready for an epic tournament featuring the world's top League of Legends teams!",
      image: image6,
      link: 'https://lolesports.com/article/state-of-the-game-lol-esports-in-2023/blt5d3bca31d1b39e0c',
    },
    {
      title: 'Patch Notes',
      description: 'Check out the latest balance changes and updates in the newest League of Legends patch!',
      image: image4,
      link: 'https://www.leagueoflegends.com/es-es/news/game-updates/notas-de-la-version-13-10/',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (link) => {
    window.location.href = link;
  };

  const renderImage = (index) => {
    if (index === 0) {
      return (
        <img
          src={image1}
          alt="Imagen 1"
          onClick={() => handleImageClick(news[index].link)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (index === 1) {
      return (
        <img
          src={image2}
          alt="Imagen 2"
          onClick={() => handleImageClick(news[index].link)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (index === 2) {
      return (
        <img
          src={image3}
          alt="Imagen 3"
          onClick={() => handleImageClick(news[index].link)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
  };

  return (
    <div className="index-page" >
      <h1 className="page-title" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>News</h1>
      <div className="carousel" >
        <div className="carousel-inner" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{renderImage(currentImageIndex)}</div>
      </div>

      <div className="news-section-container">
        <div className="news-section">
          {news.map((item, index) => (
            <div className="news-item" key={index}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link to={item.link} className="read-more-link">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;