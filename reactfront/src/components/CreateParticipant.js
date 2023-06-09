import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/participant';

const CreateParticipant = () => {
  const [league, setLeague] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate();

  const validateNumbers = (value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };

  const store = async (e) => {
    e.preventDefault();

    if (league.trim() === '') {
      toast.error('Please enter a league.');
      return;
    }
    
    if (!validateNumbers(league)) {
      toast.error('League should contain only numbers.');
      return;
    }

    if (team.trim() === '') {
      toast.error('Please enter a team.');
      return;
    }

    if (!validateNumbers(team)) {
      toast.error('Team should contain only numbers.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { league, team }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showParticipants');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Create Participant</h3>
      <ToastContainer />
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
        <div className="d-flex justify-content-between">
          <Link to="/showParticipants" className="btn btn-outline-primary">
            Go Back
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateParticipant;
