import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowCountries.css';

const endpoint = 'http://localhost:8000/api';

const ShowCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    const response = await axios.get(`${endpoint}/countries`);
    setCountries(response.data);
  };

  const deleteCountry = async (id) => {
    await axios.delete(`${endpoint}/country/${id}`);
    getAllCountries();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="action-bar">
            <Link to="/create" className="btn btn-success btn-lg text-white">
              Create
            </Link>
            <Link to="/index" className="btn btn-primary btn-lg text-white">
              Volver al menú
            </Link>
          </div>

          <table className="table table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th>Name</th>
                <th>Demonym</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id}>
                  <td>{country.name}</td>
                  <td>{country.demonym}</td>
                  <td>
                    <Link to={`/edit/${country.id}`} className="btn btn-warning">
                      Edit
                    </Link>
                    <button onClick={() => deleteCountry(country.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowCountries;