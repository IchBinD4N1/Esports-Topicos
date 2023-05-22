import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowRosters = () => {
  const [rosters, setRosters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

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
      <div className="show-rosters-header">
        <h2>Roster List</h2>
        <div className="action-bar">
          <Link to="/createRoster" className="btn btn-primary">
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
            <th onClick={() => handleSort('player')}>Player Id</th>
            <th onClick={() => handleSort('team')}>Team Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRosters.map((roster) => (
            <tr key={roster.id}>
              <td>{roster.id}</td>
              <td>{roster.player}</td>
              <td>{roster.team}</td>
              <td>
                <Link to={`/editRoster/${roster.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteRoster(roster.id)} className="btn btn-danger">
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

export default ShowRosters;