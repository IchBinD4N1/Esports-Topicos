import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllLeagues();
  }, []);

  const getAllLeagues = async () => {
    const token = localStorage.getItem('access_token');
    console.log('Desde ShowLeagues - Token:', token);
    try {
      const response = await axios.get(`${endpoint}/leagues`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeagues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLeague = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${endpoint}/league/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllLeagues();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredLeagues = leagues.filter((league) => {
    return league.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>League List</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {token && (
              // Renderiza el botón "Create" solo si el token de autenticación está presente
              <Link to="/createLeague" className="btn btn-primary">
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
      <SearchBar onSearch={handleSearch} />

      <table className="table table-striped mx-auto mt-4" style={{ width: '80%' }}>
        <thead className="bg-primary text-white">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Location Id</th>
            {token && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredLeagues.map((league) => (
            <tr key={league.id}>
              <td>{league.id}</td>
              <td>{league.name}</td>
              <td>{league.location}</td>
              {token && (
              <td>
                <Link to={`/editLeague/${league.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteLeague(league.id)} className="btn btn-danger">
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

export default ShowLeagues;