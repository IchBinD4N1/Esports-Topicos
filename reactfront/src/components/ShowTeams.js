import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowTeams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    getAllTeams();
  }, []);

  const getAllTeams = async () => {
    try {
      const response = await axios.get(`${endpoint}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`${endpoint}/team/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllTeams();
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

  const sortedTeams = [...teams].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredTeams = sortedTeams.filter((team) => {
    return team.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Team List</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {token && (
              // Renderiza el botón "Create" solo si el token de autenticación está presente
              <Link to="/createTeam" className="btn btn-primary">
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
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('location')}>Location</th>
            {token && (
            <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredTeams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.location}</td>
              {token && (
              <td>
                <Link to={`/editTeam/${team.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteTeam(team.id)} className="btn btn-danger">
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

export default ShowTeams;
