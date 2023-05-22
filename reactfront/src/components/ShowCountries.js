import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const endpoint = 'http://localhost:8000/api';

const ShowCountry = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const token = localStorage.getItem('access_token'); // Obtén el token de autenticación

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    try {
      const response = await axios.get(`${endpoint}/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCountry = async (id) => {
    try {
      await axios.delete(`${endpoint}/country/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllCountries();
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

  const sortedCountries = [...countries].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredCountries = sortedCountries.filter((country) => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Country List</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {token && (
              // Renderiza el botón "Create" solo si el token de autenticación está presente
              <Link to="/createCountry" className="btn btn-primary">
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
            <th onClick={() => handleSort('demonym')}>Demonym</th>
            {token && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.demonym}</td>

              {token && (
                // Renderiza los botones de acciones solo si el token de autenticación está presente
                <td>
                  <Link to={`/editCountry/${country.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button onClick={() => deleteCountry(country.id)} className="btn btn-danger">
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

export default ShowCountry;
