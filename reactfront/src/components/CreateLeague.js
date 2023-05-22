import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/league';

const CreateLeague = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { name, location }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showLeagues');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create League</h3>
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
          <label className="form-label">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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

export default CreateLeague;