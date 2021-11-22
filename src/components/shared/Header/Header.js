import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Header = ({ boardDetail }) => {
	const { user, isAdmin, handleSignOut } = useAuth();
	return (
		<header className='bg-dark text-white py-2'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className=''>
					<Link to='/'>
						{boardDetail && (
							<img
								className='object-cover h-10'
								src={`data:image/*;base64,${boardDetail?.logo}`}
								alt={boardDetail?.title}
							/>
						)}
					</Link>
				</div>
				<div className='flex items-center space-x-2'>
					{user && isAdmin && (
						<Link to='/dashboard'>
							<button className='bg-white bg-opacity-10 px-4 py-2 rounded-lg'>
								Admin Dashboard
							</button>
						</Link>
					)}
					{!user ? (
						<Link to='userlogin'>
							<button className='bg-white bg-opacity-10 px-4 py-2 rounded-lg'>
								Log In
							</button>
						</Link>
					) : (
						<>
							<p className='hidden lg:block'>
								{user?.displayName}
							</p>
							<button
								className='bg-white bg-opacity-10 px-4 py-2 rounded-lg'
								onClick={handleSignOut}
							>
								Sign Out
							</button>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
