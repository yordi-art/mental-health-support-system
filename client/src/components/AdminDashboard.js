import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <div style={{ background: 'white', padding: '16px' }}>
        <h1>🌿 MindCare - Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ padding: '20px' }}>
        <h2>Admin Control Panel</h2>
        <p>Total Users: {users.length}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
