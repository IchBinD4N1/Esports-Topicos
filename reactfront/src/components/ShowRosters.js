import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowRosters = () => {
  const [rosters, setRosters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });
  const token = localStorage.getItem('access_token'); // Obtén el token de autenticación

  useEffect(() => {
    getAllRosters();
  }, []);

  const getAllRosters = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Desde ShowRosters - Token:', token);
    try {
      const response = await axios.get(`${endpoint}/rosters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRosters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoster = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${endpoint}/roster/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllRosters();
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

  const sortedRosters = [...rosters].sort((a, b) => {
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

  const filteredRosters = sortedRosters.filter((roster) => {
    const player = roster.player.toString().toLowerCase();
    const team = roster.team.toString().toLowerCase();
    return player.includes(searchTerm.toLowerCase()) || team.includes(searchTerm.toLowerCase());
  });

  return (
<div className="container">
      <div className="row">
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Roster List</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {token && (
              // Renderiza el botón "Create" solo si el token de autenticación está presente
              <Link to="/createRoster" className="btn btn-primary">
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
            <th onClick={() => handleSort('player')}>Player Id</th>
            <th onClick={() => handleSort('team')}>Team Id</th>
            {token && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRosters.map((roster) => (
            <tr key={roster.id}>
              <td>{roster.id}</td>
              <td>{roster.player}</td>
              <td>{roster.team}</td>
              {token && (
              <td>
                <Link to={`/editRoster/${roster.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteRoster(roster.id)} className="btn btn-danger">
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

export default ShowRosters;