import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ background: 'white', padding: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#4a90e2' }}>🌿 MindCare</h1>
          <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Welcome back, {user.fullName}! 👋</h2>
          <p>Your mental wellness journey continues.</p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h3>Verified Professionals</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
