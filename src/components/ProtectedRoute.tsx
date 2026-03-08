import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { user, userProfile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && userProfile?.role !== 'admin' && user.email !== 'admin@vijaytent.com') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
