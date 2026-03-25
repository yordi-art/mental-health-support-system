import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to="/login" />;
  if (role && user.userType !== role) return <Navigate to={`/${user.userType}-dashboard`} />;
  return children;
};

export default PrivateRoute;
