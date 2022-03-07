import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { MdLogin, MdLogout, MdAdminPanelSettings } from 'react-icons/md';
import { Avatar, ListItemIcon, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import CustomMenu from '../CustomMenu/CustomMenu';

// framer-motion-animations-variants
const buttonAnimation = {
	hidden: { scale: 0, opacity: 0, x: 400 },
	visible: {
		x: 0,
		scale: 1,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 40,
		},
	},
};

const logoAnimation = {
	hover: {
		scale: 1.18,
		x: 1,
		transition: {
			flip: 10,
			duration: 0.9,
			ease: 'easeOut',
		},
	},
};

const Header = ({ boardDetail }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { user, isAdmin, handleSignOut } = useAuth();

	return (
		<header className='bg-dark text-white px-2 lg:px-0 py-2'>
			<div className='container mx-auto py-2 flex justify-between items-center'>
				{/* logo */}
				<div>
					<Link to='/'>
						{boardDetail && (
							<motion.img
								variants={logoAnimation}
								whileHover='hover'
								className='object-cover h-10'
								src={`data:image/*;base64,${boardDetail?.logo}`}
								alt={boardDetail?.title}
							/>
						)}
					</Link>
				</div>
				{/* links and user info */}
				<div className='bg-white bg-opacity-10 p-1 rounded-lg flex justify-between items-center space-x-2'>
					{/* admin dashboard link */}
					{user && isAdmin && (
						<Link to='/dashboard'>
							<motion.button
								variants={buttonAnimation}
								initial='hidden'
								animate='visible'
								className='px-4 py-2 rounded-lg bg-dark text-white text-xl flex justify-center items-center space-x-1 '
							>
								<span className='text-xs'>Admin</span>
								<MdAdminPanelSettings />
							</motion.button>
						</Link>
					)}
					{/* sign in button and user credentials */}
					{!user ? (
						<Link to='userlogin'>
							<motion.button
								variants={buttonAnimation}
								initial='hidden'
								animate='visible'
								className='px-4 py-2 rounded-lg bg-dark text-white text-xl flex justify-center items-center space-x-1'
							>
								<span className='text-xs'>Login</span>
								<MdLogin />
							</motion.button>
						</Link>
					) : (
						<>
							<motion.button
								variants={buttonAnimation}
								initial='hidden'
								animate='visible'
								className='flex justify-between items-center bg-dark rounded-lg px-4 py-2 space-x-1'
								onClick={(event) =>
									setAnchorEl(event.currentTarget)
								}
							>
								<p className='text-xs'>
									{user?.displayName?.split(' ', 1)[0]}
								</p>
								<Avatar
									src={user?.photoURL}
									sx={{ width: '20px', height: '20px' }}
								/>
							</motion.button>
						</>
					)}
				</div>
			</div>
			{/* menu for user credentials */}
			<CustomMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
				<MenuItem
					onClick={() => {
						handleSignOut();
						setAnchorEl(null);
					}}
				>
					<ListItemIcon>
						<MdLogout />
					</ListItemIcon>
					Logout
				</MenuItem>
			</CustomMenu>
		</header>
	);
};

export default Header;
