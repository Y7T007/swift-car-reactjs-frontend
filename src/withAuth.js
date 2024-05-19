import React from 'react';
import { useNavigate } from 'react-router-dom';

export function withAuth(ComponentToProtect) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('swiftcar-token');

    if (!token) {
      window.location.href = '/admin/SignIn ';
      // If the token isn't present in local storage, navigate to login page

      navigate('/admin/SignIn');
      return null;
    }

    // If the token is present, render the component that was passed in
    return <ComponentToProtect {...props} />;
  };
}