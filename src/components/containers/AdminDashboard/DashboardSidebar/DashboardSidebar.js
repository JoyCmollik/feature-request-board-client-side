import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	IoLogOutOutline,
	IoHome,
	IoAppsOutline,
	IoTerminalOutline,
} from 'react-icons/io5';
import { HiCog } from 'react-icons/hi';
import useAuth from '../../../../hooks/useAuth';

const linkList = [
	{
		to: '/dashboard',
		text: 'Dashboard',
		icon: <IoAppsOutline />,
	},
	{
		to: 'configure',
		text: 'Configure Board',
		icon: <HiCog />,
	},
	{
		to: 'manage',
		text: 'Manage Requests',
		icon: <IoTerminalOutline />,
	},
	{
		to: '/home',
		text: 'Back to Client Side',
		icon: <IoHome />,
	},
];

const DashboardSidebar = () => {
	const { handleSignOut } = useAuth();

	return (
		<div className='hidden h-screen p-4 lg:flex flex-col justify-between'>
			<div className='space-y-20'>
				<h4 className='text-xl text-white text-center font-medium bg-dark p-2 rounded-lg'>
					Feature Request Board
				</h4>
				<div className='grid grid-cols-2 place-items-center gap-4'>
					{linkList.map(({ to, text, icon }, linkIdx) => (
						<div
							key={linkIdx}
							className='flex flex-col justify-center items-center space-y-3'
						>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`p-5 text-3xl rounded-lg flex flex-col justify-center items-center box-shadow ${
										isActive
											? 'bg-dark text-white'
											: 'bg-white text-dark'
									}`
								}
							>
								{icon}
							</NavLink>
							<h5 className='text-dark text-center font-medium'>
								{text}
							</h5>
						</div>
					))}
				</div>
			</div>
			<button
				onClick={handleSignOut}
				className='px-5 py-2 rounded-lg flex flex-col justify-between items-center bg-white box-shadow mb-5'
				to='/login'
			>
				<span className='text-dark text-3xl'>
					<IoLogOutOutline />
				</span>
				<span className='text-dark font-medium'>Logout</span>
			</button>
		</div>
	);
};

export default DashboardSidebar;
