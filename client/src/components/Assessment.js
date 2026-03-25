import React from 'react';
import { useNavigate } from 'react-router-dom';

const Assessment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Mental Health Assessment</h1>
      <p>Coming Soon!</p>
      <button onClick={() => navigate('/client-dashboard')}>Back</button>
    </div>
  );
};

export default Assessment;
