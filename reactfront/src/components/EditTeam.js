import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/team/';

const EditTeam = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Please enter a name.');
      return;
    }

    if (location.toString().trim() === '') {
      toast.error('Please enter a location.');
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

      await axios.put(`${endpoint}${id}`, { name, location }, config);

      navigate('/showTeams');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el equipo');
    }
  };

  useEffect(() => {
    const getTeamById = async () => {
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
        setName(response.data.name);
        setLocation(response.data.location);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el equipo');
      }
    };

    getTeamById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Team</h3>
      <ToastContainer />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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
          <Link to="/showTeams" className="btn btn-outline-primary">
            Back
          </Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditTeam;
