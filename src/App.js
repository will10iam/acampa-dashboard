import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

