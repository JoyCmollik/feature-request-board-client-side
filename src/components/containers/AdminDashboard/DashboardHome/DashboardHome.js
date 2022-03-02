import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardNav from '../DashboardNav/DashboardNav';
import useAuth from '../../../../hooks/useAuth';
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';

// framer-motion animations
const containerVariants = {
	hidden: {
		x: '100vw',
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: '100vw',
		opacity: 0,
		transition: { ease: 'easeInOut' },
	},
};

const DashboardHome = () => {
	const { user } = useAuth();

	return (
		<motion.div
			className='lg:grid grid-cols-12 min-h-screen'
			// variants={containerVariants}
			// initial='hidden'
			// animate='visible'
			// exit='exit'
		>
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
		</motion.div>
	);
};

export default DashboardHome;
