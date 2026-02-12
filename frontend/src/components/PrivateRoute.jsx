import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    // Still loading user check? We might need a loading state in AuthContext.
    // For now, assume user is undefined if not logged in.

    if (user === undefined) {
        const currentUser = localStorage.getItem('user');
        if (!currentUser) return <Navigate to="/login" />;
        // If user is in localStorage but state not updated yet, we might want to wait or just rely on state?
        // The context initializes state in useEffect, which runs after render.
        // So on first render user is undefined.
        // Better to check localStorage directly here or add loading state.
        return <Outlet />; // Optimistically render or show loading
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
