import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    
    const allAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const userAssessments = allAssessments.filter(a => a.clientId === userData?.email);
    setAssessments(userAssessments);
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = allAppointments.filter(a => a.clientId === userData?.email);
    setAppointments(userAppointments);
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
            <p>Client Dashboard</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">👤 Profile</button>
            <button onClick={handleLogout} className="btn btn-secondary">🚪 Logout</button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome back, {user.fullName}! 👋</h2>
          <p>How are you feeling today? Your mental wellness journey continues.</p>
          <div style={{ marginTop: '15px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', marginRight: '10px' }}>
              📊 {assessments.length} Assessments
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px' }}>
              📅 {appointments.filter(a => a.status === 'confirmed').length} Upcoming
            </span>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{assessments.length}</div>
            <div>Assessments Taken</div>
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
        
        <div className="card" onClick={() => navigate('/assessment')}>
          <h3>📊 Take Mental Health Assessment</h3>
          <p>Check your anxiety and depression levels with PHQ-9 and GAD-7</p>
        </div>
        
        <div className="card" onClick={() => alert('Therapist matching coming soon!')}>
          <h3>👥 Find a Therapist</h3>
          <p>Connect with verified mental health professionals</p>
        </div>
        
        <div className="card" onClick={() => alert('Appointment booking coming soon!')}>
          <h3>📅 Book a Session</h3>
          <p>Schedule your therapy session</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;