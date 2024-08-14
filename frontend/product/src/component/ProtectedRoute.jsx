import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ role, children }) {
    const user = useSelector((store) => store.user.value);
    console.log("User:", user); // Debugging log
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.user.role !== role) {
        return <Navigate to="/" />;
    }
    return children;
}
