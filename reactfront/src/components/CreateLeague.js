import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/league';

const CreateLeague = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const validateNumbers = (value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };

  const store = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Please enter a name.');
      return;
    }

    if (location.trim() === '') {
      toast.error('Please enter a location.');
      return;
    }

    if (!validateNumbers(location)) {
      toast.error('Location should contain only numbers.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { name, location }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showLeagues');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Create League</h3>
      <ToastContainer />
      <form onSubmit={store}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/showLeagues" className="btn btn-outline-primary">
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

export default CreateLeague;
