import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Desde ShowPlayers - Token:', token);
    try {
      const response = await axios.get(`${endpoint}/players`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlayer = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${endpoint}/player/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllPlayers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredPlayers = players.filter((player) => {
    return (
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="show-players-header">
        <h2>Player List</h2>
        <div className="action-bar">
          <Link to="/createPlayer" className="btn btn-primary">
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
            <th>Id</th>
            <th>Nickname</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.nickname}</td>
              <td>{player.name}</td>
              <td>{player.nationality}</td>
              <td>{player.age}</td>
              <td>
                <Link to={`/editPlayer/${player.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deletePlayer(player.id)} className="btn btn-danger">
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

export default ShowPlayers;