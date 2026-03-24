import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'client',
    licenseNumber: '',
    experience: '',
    specialization: '',
    hourlyRate: ''
  });
  const [showProfessionalFields, setShowProfessionalFields] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { fullName, email, password, userType, licenseNumber, experience, specialization, hourlyRate } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUserTypeChange = e => {
    const type = e.target.value;
    setFormData({ ...formData, userType: type });
    setShowProfessionalFields(type === 'therapist' || type === 'counselor');
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }
    
    const newUser = {
      email,
      fullName,
      userType,
      registeredAt: new Date().toISOString(),
      verified: userType === 'client' // Clients auto-verified, professionals need admin approval
    };
    
    if (userType === 'therapist' || userType === 'counselor') {
      newUser.licenseNumber = licenseNumber;
      newUser.experience = experience;
      newUser.specialization = specialization;
      newUser.hourlyRate = hourlyRate;
      newUser.verified = false;
      
      // Add to pending verifications
      const pending = JSON.parse(localStorage.getItem('pendingVerifications') || '[]');
      pending.push({
        id: Date.now(),
        name: fullName,
        email: email,
        role: userType,
        licenseNumber: licenseNumber,
        specialization: specialization,
        experience: experience
      });
      localStorage.setItem('pendingVerifications', JSON.stringify(pending));
      
      alert('Registration submitted! Your account will be verified by admin within 24 hours.');
    } else {
      alert('Account created successfully! Welcome to MindCare!');
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    
    navigate(`/${userType}-dashboard`);
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
      
      {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={onChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
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
            placeholder="Create a password (min 6 characters)"
          />
        </div>
        
        <div className="form-group">
          <label>User Type</label>
          <select name="userType" value={userType} onChange={onUserTypeChange}>
            <option value="client">Client - Seeking Support</option>
            <option value="therapist">Therapist - Licensed Therapist</option>
            <option value="counselor">Counselor - Mental Health Counselor</option>
          </select>
        </div>
        
        {showProfessionalFields && (
          <>
            <div className="form-group">
              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={licenseNumber}
                onChange={onChange}
                placeholder="Enter your license number"
              />
            </div>
            
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={experience}
                onChange={onChange}
                placeholder="Years of experience"
              />
            </div>
            
            <div className="form-group">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={specialization}
                onChange={onChange}
                placeholder="e.g., Anxiety, Depression, Trauma"
              />
            </div>
            
            <div className="form-group">
              <label>Hourly Rate ($)</label>
              <input
                type="number"
                name="hourlyRate"
                value={hourlyRate}
                onChange={onChange}
                placeholder="Your hourly rate"
              />
            </div>
          </>
        )}
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Register
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;