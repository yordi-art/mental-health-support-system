import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    setPendingVerifications(JSON.parse(localStorage.getItem('pendingVerifications') || '[]'));
    setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]'));
    setAssessments(JSON.parse(localStorage.getItem('assessments') || '[]'));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const verifyProfessional = (id, approve) => {
    const pending = [...pendingVerifications];
    const verification = pending.find(v => v.id === id);
    
    if (approve && verification) {
      const therapists = JSON.parse(localStorage.getItem('therapists') || '[]');
      therapists.push({
        id: Date.now(),
        name: verification.name,
        role: verification.role,
        specialty: verification.specialization,
        experience: verification.experience,
        rating: 0,
        price: 75,
        image: verification.role === 'therapist' ? '👨‍⚕️' : '👩‍⚕️',
        verified: true
      });
      localStorage.setItem('therapists', JSON.stringify(therapists));
      
      const allUsers = [...users];
      const userIndex = allUsers.findIndex(u => u.email === verification.email);
      if (userIndex !== -1) {
        allUsers[userIndex].verified = true;
        localStorage.setItem('users', JSON.stringify(allUsers));
      }
      
      alert(`${verification.name} has been verified!`);
    }
    
    const newPending = pending.filter(v => v.id !== id);
    localStorage.setItem('pendingVerifications', JSON.stringify(newPending));
    loadData();
  };

  const deleteUser = (email) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const newUsers = users.filter(u => u.email !== email);
      localStorage.setItem('users', JSON.stringify(newUsers));
      loadData();
      alert('User deleted successfully');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="nav-content">
          <div className="logo">
            <h1>🌿 MindCare</h1>
            <p>Admin Dashboard</p>
          </div>
          <div className="nav-links">
            <button onClick={handleLogout} className="btn btn-secondary">🚪 Logout</button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}>
          <h2>Admin Control Panel 🔧</h2>
          <p>System Overview & Management</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div>Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingVerifications.length}</div>
            <div>Pending Verifications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{appointments.length}</div>
            <div>Total Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{assessments.length}</div>
            <div>Assessments</div>
          </div>
        </div>
        
        <h3 style={{ marginBottom: '15px' }}>⏳ Pending Verifications ({pendingVerifications.length})</h3>
        {pendingVerifications.map(v => (
          <div className="card" key={v.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{v.name}</strong>
                <p>{v.role} | License: {v.licenseNumber}</p>
                <p>Specialization: {v.specialization} | {v.experience} years</p>
              </div>
              <div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => verifyProfessional(v.id, true)}
                  style={{ marginRight: '10px', padding: '8px 16px' }}
                >
                  ✓ Verify
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => verifyProfessional(v.id, false)}
                  style={{ padding: '8px 16px' }}
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <h3 style={{ marginBottom: '15px', marginTop: '30px' }}>👥 Registered Users</h3>
        {users.slice(-5).reverse().map(u => (
          <div className="card" key={u.email}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{u.fullName}</strong>
                <p>{u.email}</p>
                <small>{u.userType} | Joined: {new Date(u.registeredAt).toLocaleDateString()}</small>
              </div>
              {u.userType !== 'admin' && (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => deleteUser(u.email)}
                  style={{ padding: '5px 10px' }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;