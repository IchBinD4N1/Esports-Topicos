import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/roster';

const CreateRoster = () => {
  const [player, setPlayer] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { player, team }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showRosters');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Roster</h3>
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Player</label>
          <input
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Team</label>
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <Link to="/showRosters" className="btn btn-outline-primary">
          Go Back
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateRoster;