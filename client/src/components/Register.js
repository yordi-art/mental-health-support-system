import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'client',
    phone: '',
    gender: '',
    dateOfBirth: '',
    professionType: 'therapist',
    specialization: '',
    experience: '',
    institution: '',
    bio: '',
    licenseNumber: '',
    issuingAuthority: '',
    issueDate: '',
    expiryDate: '',
    licenseFile: null
  });
  const [error, setError] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, licenseFile: e.target.files[0] });
  };

  const systemVerification = (data) => {
    // Simulate system verification checks
    const checks = {
      licenseNumberValid: data.licenseNumber && data.licenseNumber.length >= 5,
      expiryValid: new Date(data.expiryDate) > new Date(),
      nameMatch: data.fullName && data.fullName.length > 2,
      specializationValid: data.specialization && data.specialization.length > 2,
      experienceValid: data.experience && parseInt(data.experience) >= 0,
      fileUploaded: data.licenseFile !== null
    };
    
    const allPassed = Object.values(checks).every(v => v === true);
    const score = Object.values(checks).filter(v => v === true).length / Object.values(checks).length * 100;
    
    return {
      verified: allPassed,
      score: Math.round(score),
      checks: checks,
      message: allPassed ? 'System verification completed successfully' : 'Some verification checks failed'
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Admin registration - special case
    if (formData.userType === 'admin') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      
      const newUser = {
        ...formData,
        registeredAt: new Date().toISOString(),
        verificationStatus: 'verified',
        role: 'system_administrator'
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Admin account created successfully!');
      navigate('/admin-dashboard');
      return;
    }
    
    // Client registration
    if (formData.userType === 'client') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      
      const newUser = {
        ...formData,
        registeredAt: new Date().toISOString(),
        verificationStatus: 'verified'
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Account created successfully!');
      navigate('/client-dashboard');
      return;
    }
    
    // Therapist or Counselor registration with verification
    if (formData.userType === 'therapist' || formData.userType === 'counselor') {
      // Run system verification
      const verification = systemVerification(formData);
      setVerificationResult(verification);
      
      if (verification.verified) {
        setStep(3); // Show success page
        // Save user with verified status
        const newUser = {
          ...formData,
          userType: formData.userType,
          registeredAt: new Date().toISOString(),
          verificationStatus: 'verified',
          verificationScore: verification.score,
          verifiedAt: new Date().toISOString()
        };
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(newUser));
        
        setTimeout(() => {
          navigate(`/${formData.userType}-dashboard`);
        }, 2000);
      } else {
        setStep(2); // Show verification results
      }
    }
  };

  // Step 1: Basic Info
  if (step === 1) {
    return (
      <div style={{ maxWidth: '500px', margin: '30px auto', background: 'white', padding: '30px', borderRadius: '12px' }}>
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>Join MindCare today</p>
        
        {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', margin: '20px 0' }}>{error}</div>}
        
        <form onSubmit={(e) => { e.preventDefault(); 
          if (formData.userType === 'admin') {
            // Admin doesn't need step 2
            onSubmit(e);
          } else {
            setStep(2);
          }
        }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
            <small style={{ fontSize: '11px', color: '#999' }}>Minimum 6 characters</small>
          </div>
          
          <div className="form-group">
            <label>Phone (Optional)</label>
            <input type="tel" name="phone" value={formData.phone} onChange={onChange} style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div className="form-group">
            <label>User Type</label>
            <select name="userType" value={formData.userType} onChange={onChange} style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <option value="client">Client - Seeking Support</option>
              <option value="therapist">Therapist - Licensed Therapist</option>
              <option value="counselor">Counselor - Mental Health Counselor</option>
              <option value="admin">Admin - System Administrator</option>
            </select>
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
            {formData.userType === 'admin' ? 'Create Admin Account' : 'Continue'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    );
  }

  // Step 2: Professional Verification (for therapists/counselors)
  if (step === 2 && (formData.userType === 'therapist' || formData.userType === 'counselor')) {
    return (
      <div style={{ maxWidth: '600px', margin: '30px auto', background: 'white', padding: '30px', borderRadius: '12px' }}>
        <h2 style={{ textAlign: 'center' }}>Professional Verification</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>Step 2 of 2 - System will verify your credentials</p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Profession Type</label>
            <select name="professionType" value={formData.professionType} onChange={onChange} style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <option value="therapist">Therapist</option>
              <option value="counselor">Counselor</option>
              <option value="psychologist">Psychologist</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Specialization</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={onChange} required placeholder="e.g., Anxiety, Depression, Trauma" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div className="form-group">
            <label>Years of Experience</label>
            <input type="number" name="experience" value={formData.experience} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div className="form-group">
            <label>Institution / Workplace</label>
            <input type="text" name="institution" value={formData.institution} onChange={onChange} style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
            <h3>📄 License Verification</h3>
            
            <div className="form-group">
              <label>License Number</label>
              <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            
            <div className="form-group">
              <label>Issuing Authority / Board</label>
              <input type="text" name="issuingAuthority" value={formData.issuingAuthority} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            
            <div className="form-group">
              <label>Issue Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={onChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            
            <div className="form-group">
              <label>Upload License Document</label>
              <input type="file" name="licenseFile" onChange={onFileChange} accept=".pdf,.jpg,.png" required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
              <small>Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
            </div>
          </div>
          
          <div className="form-group">
            <label>Bio / Professional Summary</label>
            <textarea name="bio" value={formData.bio} onChange={onChange} rows="3" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}></textarea>
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit for System Verification
          </button>
        </form>
      </div>
    );
  }

  // Step 3: Verification Results
  if (step === 3 && verificationResult) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
        {verificationResult.verified ? (
          <>
            <div style={{ fontSize: '60px' }}>✅</div>
            <h2 style={{ color: '#4caf50' }}>Verification Successful!</h2>
            <p>Your professional credentials have been verified by the system.</p>
            <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
              <strong>Verification Score: {verificationResult.score}%</strong>
              <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                <li>✅ License Number Valid</li>
                <li>✅ License Not Expired</li>
                <li>✅ Name Match Verified</li>
                <li>✅ Specialization Valid</li>
                <li>✅ Document Uploaded</li>
              </ul>
            </div>
            <p>Redirecting to your dashboard...</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: '60px' }}>⚠️</div>
            <h2 style={{ color: '#ff9800' }}>Verification Failed</h2>
            <p>Some verification checks did not pass. Please review and try again.</p>
            <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '8px', margin: '20px 0', textAlign: 'left' }}>
              <strong>Issues Found:</strong>
              <ul>
                {!verificationResult.checks.licenseNumberValid && <li>❌ Invalid license number format</li>}
                {!verificationResult.checks.expiryValid && <li>❌ License has expired</li>}
                {!verificationResult.checks.nameMatch && <li>❌ Name verification failed</li>}
                {!verificationResult.checks.specializationValid && <li>❌ Specialization not specified</li>}
                {!verificationResult.checks.fileUploaded && <li>❌ License document missing</li>}
              </ul>
            </div>
            <button onClick={() => setStep(2)} style={{ padding: '12px 24px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Try Again
            </button>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default Register;
