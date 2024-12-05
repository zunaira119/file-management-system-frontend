import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Registration from './components/Registration';
import './App.css';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('authToken') !== null);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleRegisterSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link style={{ marginLeft: '88%' }} to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          {/* If logged in, redirect to dashboard */}
          <Route path="/login" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Registration onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          {/* Redirect to login page if user is not logged in */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
