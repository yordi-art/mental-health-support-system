import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', userType: 'client' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === formData.email)) return alert('Email exists');
    const newUser = { ...formData, registeredAt: new Date().toISOString(), verificationStatus: 'verified' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate(`/${formData.userType}-dashboard`);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', background: 'white', padding: '30px', borderRadius: '12px' }}>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={onChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="email" name="email" placeholder="Email" onChange={onChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="password" name="password" placeholder="Password" onChange={onChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <select name="userType" onChange={onChange} style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <option value="client">Client</option>
          <option value="therapist">Therapist</option>
          <option value="counselor">Counselor</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
      </form>
      <p><Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
