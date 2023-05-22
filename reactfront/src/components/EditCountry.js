import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/country/';

const validateLetters = (value) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(value);
};

const EditCountry = () => {
  const [name, setName] = useState('');
  const [demonym, setDemonym] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Please enter a name.');
      return;
    }

    if (!validateLetters(name)) {
      toast.error('Name should contain only letters.');
      return;
    }

    if (demonym.trim() === '') {
      toast.error('Please enter a demonym.');
      return;
    }

    if (!validateLetters(demonym)) {
      toast.error('Demonym should contain only letters.');
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

      await axios.put(`${endpoint}${id}`, { name, demonym }, config);

      navigate('/showCountries');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el país');
    }
  };

  useEffect(() => {
    const getCountryById = async () => {
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
        setDemonym(response.data.demonym);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el país');
      }
    };

    getCountryById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Editar País</h3>
      <ToastContainer />
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
          <label htmlFor="demonym" className="form-label">Gentilicio</label>
          <input
            id="demonym"
            type="text"
            className="form-control"
            value={demonym}
            onChange={(e) => setDemonym(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/showCountries" className="btn btn-outline-primary">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCountry;
