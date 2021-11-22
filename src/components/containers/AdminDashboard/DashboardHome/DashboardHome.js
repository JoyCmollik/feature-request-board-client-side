import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardNav from '../DashboardNav/DashboardNav';
import useAuth from '../../../../hooks/useAuth';

const DashboardHome = () => {
	const { user } = useAuth();

	return (
		<div className='lg:grid grid-cols-12 min-h-screen'>
			<div className='col-span-3'>
				<DashboardSidebar />
				<DashboardNav />
			</div>
			<div className='col-span-9 bg-white p-4'>
				<div className='hidden lg:flex justify-end items-center p-10 w-full'>
					<div className='rounded-lg box-shadow px-5 py-2'>
						<h4>{user.displayName}</h4>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardHome;
