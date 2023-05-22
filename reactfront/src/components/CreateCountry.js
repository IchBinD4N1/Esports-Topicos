import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/country';

const CreateCountry = () => {
  const [name, setName] = useState('');
  const [demonym, setDemonym] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { name, demonym }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showCountries');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Country</h3>
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Demonym</label>
          <input
            value={demonym}
            onChange={(e) => setDemonym(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateCountry;