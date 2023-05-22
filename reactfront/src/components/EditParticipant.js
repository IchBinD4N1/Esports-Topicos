import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/participant/';

const EditParticipant = () => {
  const [league, setLeague] = useState('');
  const [team, setTeam] = useState('');
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
      await axios.put(`${endpoint}${id}`, { league, team }, config);

      // Redirigir al índice
      navigate('/showParticipants');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el país');
    }
  };

  useEffect(() => {
    const getParticipantById = async () => {
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
        setLeague(response.data.league);
        setTeam(response.data.team);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el país');
      }
    };

    getParticipantById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Participant</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="team" className="form-label">League</label>
          <input
            id="league"
            type="text"
            className="form-control"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="team" className="form-label">Team</label>
          <input
            id="team"
            type="text"
            className="form-control"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/showParticipants" className="btn btn-outline-primary">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditParticipant;