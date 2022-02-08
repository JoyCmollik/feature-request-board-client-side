import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children }) => {
	const { user, isLoading, isAdmin } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return user && isAdmin ? (
		children
	) : (
		<Navigate to='/home' state={{ from: location }} />
	);
};

export default AdminRoute;
