import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/league/';

const EditLeague = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    try {
      // Obtener el token de autenticación desde el almacenamiento (por ejemplo, localStorage)
      const token = localStorage.getItem('access_token');

      // Verificar que se haya proporcionado un token válido
      if (!token) {
        setError('No se ha proporcionado un token válido');
        return;
      }

      // Configurar el encabezado de autorización con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud PUT con el token de autorización
      await axios.put(`${endpoint}${id}`, { name, location }, config);

      // Redirigir al índice
      navigate('/showLeagues');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el país');
    }
  };

  useEffect(() => {
    const getLeagueById = async () => {
      try {
        // Obtener el token de autenticación desde el almacenamiento (por ejemplo, localStorage)
        const token = localStorage.getItem('access_token');

        // Verificar que se haya proporcionado un token válido
        if (!token) {
          setError('No se ha proporcionado un token válido');
          return;
        }

        // Configurar el encabezado de autorización con el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Realizar la solicitud GET con el token de autorización
        const response = await axios.get(`${endpoint}${id}`, config);
        setName(response.data.name);
        setLocation(response.data.location);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el país');
      }
    };

    getLeagueById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit League</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            id="location"
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/showLeagues" className="btn btn-outline-primary">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditLeague;