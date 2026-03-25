import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'client' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email);
    if (!user) return setError('User not found');
    if (user.userType !== formData.userType) return setError(`Invalid user type`);
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/${user.userType}-dashboard`);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', background: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center' }}>Welcome Back</h2>
      {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', margin: '10px 0' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input type="email" name="email" placeholder="Email" onChange={onChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input type="password" name="password" placeholder="Password" onChange={onChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <select name="userType" onChange={onChange} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <option value="client">Client</option>
            <option value="therapist">Therapist</option>
            <option value="counselor">Counselor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}><Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
