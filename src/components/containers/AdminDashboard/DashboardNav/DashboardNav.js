import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
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

const MobileNav = () => {
	const [state, setState] = React.useState(false);
	const { user, handleSignOut } = useAuth();

	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState(open);
	};

	const list = () => (
		<div
			className='bg-dark h-full text-white px-2 py-5 space-y-5'
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<button
				onClick={toggleDrawer(false)}
				className='block p-2 bg-red-100 text-red-800 rounded-lg mb-5 ml-auto'
			>
				<IoAppsOutline color='error' />
			</button>

			<div className='grid grid-cols-2 place-items-center gap-4'>
				{linkList.map(({ to, text, icon }, linkIdx) => (
					<div
						key={linkIdx}
						className='flex flex-col justify-center items-center space-y-3'
					>
						<NavLink
							to={to}
							className={({ isActive }) =>
								`p-3 text-3xl rounded-lg flex flex-col justify-center items-center box-shadow ${
									isActive
										? 'bg-dark text-white border border-brand'
										: 'bg-brand text-dark'
								}`
							}
						>
							{icon}
						</NavLink>
						<h5 className='text-brand text-center font-medium'>
							{text}
						</h5>
					</div>
				))}
			</div>
			<Divider sx={{ background: '#FFFCFF' }} />
			<button
				onClick={handleSignOut}
				className='w-full py-1 rounded-lg flex justify-center items-center space-x-2 bg-dark text-white border border-brand box-shadow mb-5'
				to='/login'
			>
				<span className='text-brand font-medium'>Logout</span>
				<span className='text-dark text-3xl'>
					<IoLogOutOutline />
				</span>
			</button>
		</div>
	);

	return (
		<div className='lg:hidden bg-dark p-4 flex justify-between items-center'>
			<div className=''>
				<button
					onClick={toggleDrawer(true)}
					className='px-2 py-1 rounded text-primary border-2 border-primary'
				>
					<IoAppsOutline />
				</button>
				<SwipeableDrawer
					open={state}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					{list()}
				</SwipeableDrawer>
			</div>
			<div className='logo'>
				<h2 className='text-xl font-medium text-brand'>
					Feature Request Board
				</h2>
			</div>
		</div>
	);
};

export default MobileNav;
