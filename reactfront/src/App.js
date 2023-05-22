import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import IndexPage from './components/IndexPage';
import Navbar from './components/Navbar';
import ShowCountries from './components/ShowCountries';
import CreateCountry from './components/CreateCountry';
import EditCountry from './components/EditCountry';
import ShowTeams from './components/ShowTeams';
import CreateTeam from './components/CreateTeam';
import EditTeam from './components/EditTeam';
import ShowPlayers from './components/ShowPlayers';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';
import ShowRosters from './components/ShowRosters';
import CreateRoster from './components/CreateRoster';
import EditRoster from './components/EditRoster';
import ShowParticipants from './components/ShowParticipants';
import CreateParticipant from './components/CreateParticipant';
import EditParticipant from './components/EditParticipant';
import ShowLeagues from './components/ShowLeagues';
import CreateLeague from './components/CreateLeague';
import EditLeague from './components/EditLeague';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };



  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/index" element={<IndexPage />} />
          <Route path="/showCountries" element={<ShowCountries />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/showTeams" element={<ShowTeams />} />
          <Route path="/showPlayers" element={<ShowPlayers />} />
          <Route path="/showRosters" element={<ShowRosters />} />
          <Route path="/showParticipants" element={<ShowParticipants  />} />
          <Route path="/showLeagues" element={<ShowLeagues  />} />

          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} />}
          />
          {isLoggedIn && (
            <>
              <Route path="/showCountries" element={<ShowCountries />} />
              <Route path="/createCountry" element={<CreateCountry />} />
              <Route path="/editCountry/:id" element={<EditCountry />} />
              <Route path="/showTeams" element={<ShowTeams />} />
              <Route path="/createTeam" element={<CreateTeam />} />
              <Route path="/editTeam/:id" element={<EditTeam />} />
              <Route path="/showPlayers" element={<ShowPlayers />} />
              <Route path="/createPlayer" element={<CreatePlayer />} />
              <Route path="/editPlayer/:id" element={<EditPlayer />} />
              <Route path="/showRosters" element={<ShowRosters />} />
              <Route path="/createRoster" element={<CreateRoster />} />
              <Route path="/editRoster/:id" element={<EditRoster />} />
              <Route path="/showParticipants" element={<ShowParticipants />} />
              <Route path="/createParticipant" element={<CreateParticipant />} />
              <Route path="/editParticipant/:id" element={<EditParticipant />} />
              <Route path="/showLeagues" element={<ShowLeagues />} />
              <Route path="/createLeague" element={<CreateLeague />} />
              <Route path="/editLeague/:id" element={<EditLeague />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;