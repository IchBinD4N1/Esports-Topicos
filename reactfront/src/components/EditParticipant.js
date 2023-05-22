import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/participant/';

const validateNumbers = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};

const EditParticipant = () => {
  const [league, setLeague] = useState('');
  const [team, setTeam] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    if (league.trim() === '') {
      toast.error('Please enter a league.');
      return;
    }

    if (!validateNumbers(league)) {
      toast.error('League should contain only numbers.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No se ha proporcionado un token válido');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${endpoint}${id}`, { league, team }, config);

      navigate('/showParticipants');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el participante');
    }
  };

  useEffect(() => {
    const getParticipantById = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No se ha proporcionado un token válido');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${endpoint}${id}`, config);
        setLeague(response.data.league);
        setTeam(response.data.team);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el participante');
      }
    };

    getParticipantById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Participant</h3>
      <ToastContainer />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="league" className="form-label">League</label>
          <input
            id="league"
            type="text"
            className="form-control"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/showParticipants" className="btn btn-outline-primary">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditParticipant;
