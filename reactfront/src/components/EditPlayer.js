import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/player/';

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
      await axios.put(`${endpoint}${id}`, { nickname, name, nationality, age }, config);

      // Redirigir al índice
      navigate('/showPlayers');
    } catch (error) {
      console.error(error);
      setError('Ha ocurrido un error al actualizar el país');
    }
  };

  useEffect(() => {
    const getPlayerById = async () => {
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
        setNickname(response.data.nickname);
        setName(response.data.name);
        setNationality(response.data.nationality);
        setAge(response.data.age);
      } catch (error) {
        console.error(error);
        setError('Ha ocurrido un error al obtener el país');
      }
    };

    getPlayerById();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Player</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="nickname" className="form-label">Nickname</label>
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
          <label htmlFor="nationality" className="form-label">Nationality</label>
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
          <label htmlFor="age" className="form-label">Age</label>
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
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default EditPlayer;