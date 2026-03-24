import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CounselorDashboard = () => {
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
            <p>Counselor Dashboard</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">👤 Profile</button>
            <button onClick={handleLogout} className="btn btn-secondary">🚪 Logout</button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card" style={{ background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)' }}>
          <h2>Welcome, Counselor {user.fullName}! 🤝</h2>
          <p>{user.specialization || 'Mental Health Counselor'} | Providing compassionate support</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{appointments.filter(a => a.status === 'completed').length}</div>
            <div>Completed Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</div>
            <div>Upcoming Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div>Testimonials</div>
          </div>
        </div>
        
        <h3 style={{ marginBottom: '15px' }}>Today's Counseling Sessions</h3>
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
                  onClick={() => alert('🎥 Starting counseling session...')}
                  style={{ padding: '8px 16px' }}
                >
                  Join Session
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card">No sessions scheduled for today</div>
        )}
        
        <div className="card">
          <h3>📚 Helpful Resources for Clients</h3>
          <p>• Mindfulness exercises for anxiety</p>
          <p>• Journaling prompts for depression</p>
          <p>• Breathing techniques for stress relief</p>
          <p>• Self-care checklist for clients</p>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;