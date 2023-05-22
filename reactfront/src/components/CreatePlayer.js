import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/player';

const CreatePlayer = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { nickname, name, nationality, age }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showPlayers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Player</h3>
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Nickname</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
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
          <label className="form-label">Nationality</label>
          <input
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
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

export default CreatePlayer;