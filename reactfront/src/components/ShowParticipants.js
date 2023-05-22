import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

  useEffect(() => {
    getAllParticipants();
  }, []);

  const getAllParticipants = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Desde ShowParticipants - Token:', token);
    try {
      const response = await axios.get(`${endpoint}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setParticipants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteParticipant = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${endpoint}/participant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllParticipants();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction) {
      let comparison = 0;
      const key = sortConfig.key;

      if (a[key] > b[key]) {
        comparison = 1;
      } else if (a[key] < b[key]) {
        comparison = -1;
      }

      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    }
    return 0;
  });

  const filteredParticipants = sortedParticipants.filter((participant) => {
    const league = participant.league.toString().toLowerCase();
    const team = participant.team.toString().toLowerCase();
    return league.includes(searchTerm.toLowerCase()) || team.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="show-participant-header">
        <h2>Participant List</h2>
        <div className="action-bar">
          <Link to="/createParticipant" className="btn btn-primary">
            Create
          </Link>
          <Link to="/index" className="btn btn-outline-primary">
            Back to Menu
          </Link>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      <table className="table table-striped mx-auto mt-4" style={{ width: '80%' }}>
        <thead className="bg-primary text-white">
          <tr>
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('league')}>League Id</th>
            <th onClick={() => handleSort('team')}>Team Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.league}</td>
              <td>{participant.team}</td>
              <td>
                <Link to={`/editParticipant/${participant.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteParticipant(participant.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowParticipants;