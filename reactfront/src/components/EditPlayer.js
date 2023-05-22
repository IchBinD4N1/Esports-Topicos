import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/player/';

const validateNumbers = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};

const validateAgeRange = (value) => {
  const parsedAge = parseInt(value);
  return parsedAge >= 16 && parsedAge <= 122;
};

const EditPlayer = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();

    if (nickname.trim() === '') {
      toast.error('Please enter a nickname.');
      return;
    }

    if (name.trim() === '') {
      toast.error('Please enter a name.');
      return;
    }

    if (nationality.trim() === '') {
      toast.error('Please enter a nationality.');
      return;
    }

    if (!validateNumbers(nationality)) {
      toast.error('Nationality should contain only numbers.');
      return;
    }

    if (age.toString().trim() === '') {
      toast.error('Please enter an age.');
      return;
    }

    if (!validateNumbers(age)) {
      toast.error('Age should contain only numbers.');
      return;
    }

    if (!validateAgeRange(age)) {
      toast.error('Age should be between 16 and 122.');
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

      await axios.put(`${endpoint}${id}`, { nickname, name, nationality, age }, config);

      navigate('/showPlayers');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el jugador');
    }
  };

  useEffect(() => {
    const getPlayerById = async () => {
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
        setNickname(response.data.nickname);
        setName(response.data.name);
        setNationality(response.data.nationality);
        setAge(response.data.age);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el jugador');
      }
    };

    getPlayerById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Editar Jugador</h3>
      <ToastContainer />
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="nickname" className="form-label">Apodo</label>
          <input
            id="nickname"
            type="text"
            className="form-control"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="nationality" className="form-label">Nacionalidad</label>
          <input
            id="nationality"
            type="text"
            className="form-control"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Edad</label>
          <input
            id="age"
            type="text"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/showPlayers" className="btn btn-outline-primary">
            Regresar
          </Link>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditPlayer;
