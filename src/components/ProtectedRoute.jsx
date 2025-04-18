import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const checkAuth = () => {
    // Check if the authentication token exists in localStorage
    // You might want to add more sophisticated checks here later,
    // like verifying the token's expiry date or making an API call.
    const token = localStorage.getItem('authToken'); // Use the same key as in MenuManagement & Login
    return !!token; // Returns true if token exists, false otherwise
};

const ProtectedRoute = () => {
    const isAuthenticated = checkAuth();

    // If authenticated, render the child routes/component using Outlet
    // If not authenticated, redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 