import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return user ? (
		children
	) : (
		<Navigate to='/home/userlogin' state={{ from: location }} />
	);
};

export default PrivateRoute;
