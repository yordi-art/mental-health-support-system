import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CounselorDashboard = () => {
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
      <div style={{ background: 'white', padding: '16px' }}>
        <h1>🌿 MindCare - Counselor Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ padding: '20px' }}>
        <h2>Welcome, Counselor {user.fullName}!</h2>
      </div>
    </div>
  );
};

export default CounselorDashboard;
