import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TherapistDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const myAppointments = allAppointments.filter(a => a.therapistId === userData?.email);
    setAppointments(myAppointments);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="nav-content">
          <div className="logo">
            <h1>🌿 MindCare</h1>
            <p>Therapist Dashboard</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">👤 Profile</button>
            <button onClick={handleLogout} className="btn btn-secondary">🚪 Logout</button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {user.fullName}! 👋</h2>
          <p>{user.specialization || 'Mental Health Professional'} | {user.experience || 'Experienced'} years</p>
          <div style={{ marginTop: '15px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', marginRight: '10px' }}>
              💰 ${user.hourlyRate || 80}/hr
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px' }}>
              ⭐ 4.8 Rating
            </span>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{appointments.length}</div>
            <div>Total Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</div>
            <div>Upcoming Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{appointments.filter(a => a.status === 'completed').length}</div>
            <div>Completed Sessions</div>
          </div>
        </div>
        
        <h3 style={{ marginBottom: '15px' }}>Today's Schedule</h3>
        {appointments.filter(a => a.status === 'confirmed').length > 0 ? (
          appointments.filter(a => a.status === 'confirmed').slice(0, 3).map(a => (
            <div className="card" key={a.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{a.clientName}</strong>
                  <p>📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => alert('🎥 Starting video session...')}
                  style={{ padding: '8px 16px' }}
                >
                  Start Session
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card">No appointments scheduled for today</div>
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;