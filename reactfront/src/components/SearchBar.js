import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="row">
      <div className="col-md-6 col-lg-12">
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
