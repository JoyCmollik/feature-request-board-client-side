import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardNav from '../DashboardNav/DashboardNav';
import useAuth from '../../../../hooks/useAuth';
import { Avatar } from '@mui/material';

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
					<div className='flex justify-between items-center space-x-2 rounded-lg box-shadow px-5 py-2 border'>
						<h4>{user?.displayName}</h4>
						<Avatar
							sx={{ width: '34px', height: '34px' }}
							src={user?.photoURL}
							alt={user?.displayName}
						/>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardHome;
