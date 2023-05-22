import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const token = localStorage.getItem('access_token'); // Obtén el token de autenticación

  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = async () => {
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredPlayers = sortedPlayers.filter((player) => {
    return (
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Player List</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {token && (
              // Renderiza el botón "Create" solo si el token de autenticación está presente
              <Link to="/createPlayer" className="btn btn-primary">
                Create
              </Link>
            )}
            <Link to="/index" className="btn btn-outline-primary">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
      <div className="row" >
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <table className="table table-striped mx-auto mt-4" style={{ width: 'auto', tableLayout: 'auto' }}>
        <thead className="bg-primary text-white">
          <tr>
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('nickname')}>Nickname</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('nationality')}>Nationality</th>
            <th onClick={() => handleSort('age')}>Age</th>
            {token && (
              <th>Actions</th>
            )}
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
              {token && (
              <td>
                <Link to={`/editPlayer/${player.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deletePlayer(player.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPlayers;
