import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/participant';

const CreateParticipant = () => {
  const [league, setLeague] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { league, team }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showParticipants');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Participant</h3>
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">League</label>
          <input
            value={league}
            onChange={(e) => setLeague(e.target.value)}
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
        <Link to="/showParticipants" className="btn btn-outline-primary">
            Go Back
          </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateParticipant;