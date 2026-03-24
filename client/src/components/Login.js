import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'client'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password, userType } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Demo login - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      setError('User not found. Please register first.');
      return;
    }
    
    if (user.userType !== userType) {
      setError(`Invalid user type. This account is registered as ${user.userType}.`);
      return;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // Navigate based on user type
    switch(user.userType) {
      case 'client':
        navigate('/client-dashboard');
        break;
      case 'therapist':
        navigate('/therapist-dashboard');
        break;
      case 'counselor':
        navigate('/counselor-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Mental Health Support System
      </p>
      
      {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <div className="form-group">
          <label>User Type</label>
          <select name="userType" value={userType} onChange={onChange}>
            <option value="client">Client - Seeking Support</option>
            <option value="therapist">Therapist - Licensed Therapist</option>
            <option value="counselor">Counselor - Mental Health Counselor</option>
            <option value="admin">Admin - System Administrator</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;