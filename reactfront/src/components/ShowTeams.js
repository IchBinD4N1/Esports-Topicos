import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowTeams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllTeams();
  }, []);

  const getAllTeams = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Desde ShowTeams - Token:', token);
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
    const token = localStorage.getItem('access_token');
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

  const filteredTeams = teams.filter((team) => {
    return team.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="show-teams-header">
        <h2>Team List</h2>
        <div className="action-bar">
          <Link to="/createTeam" className="btn btn-primary">
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
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.location}</td>
              <td>
                <Link to={`/editTeam/${team.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteTeam(team.id)} className="btn btn-danger">
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

export default ShowTeams;