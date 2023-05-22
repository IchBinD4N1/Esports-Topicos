import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = 'http://localhost:8000/api/player';

const CreatePlayer = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const validateNumbers = (value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };

  const validateAgeRange = (value) => {
    const parsedAge = parseInt(value);
    return parsedAge >= 16 && parsedAge <= 122;
  };

  const store = async (e) => {
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

    if (age.trim() === '') {
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

    const token = localStorage.getItem('access_token');
    try {
      await axios.post(
        endpoint,
        { nickname, name, nationality, age },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/showPlayers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Create Player</h3>
      <ToastContainer />
      <form onSubmit={store}>
        <div className="mb-3">
          <label htmlFor="nickname" className="form-label">
            Nickname
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
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
          <label htmlFor="nationality" className="form-label">
            Nationality
          </label>
          <input
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/showPlayers" className="btn btn-outline-primary">
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

export default CreatePlayer;
