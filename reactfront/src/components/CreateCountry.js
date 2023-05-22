import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/country';

const CreateCountry = () => {
  const [name, setName] = useState('');
  const [demonym, setDemonym] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Please enter a name.');
      return;
    }

    if (demonym.trim() === '') {
      toast.error('Please enter a demonym.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.post(endpoint, { name, demonym }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/showCountries');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Create Country</h3>
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
          <label htmlFor="demonym" className="form-label">
            Demonym
          </label>
          <input
            id="demonym"
            value={demonym}
            onChange={(e) => setDemonym(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/showCountries" className="btn btn-outline-primary">
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

export default CreateCountry;
