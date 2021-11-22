import React from 'react';
import { NavLink } from 'react-router-dom';

const FeaturedRequestTabs = () => {
	return (
		<div className='p-1 bg-white'>
			<div className='container mx-auto flex items-center space-x-4 p-2 bg-secondary rounded-lg'>
				<NavLink
					to='list'
					className={({ isActive }) =>
						`inline-block px-4 py-2 rounded-lg text-black border-b-4 bg-light  ${
							isActive ? 'border-primary' : 'border-transparent'
						}`
					}
				>
					Feature request list
				</NavLink>
				<NavLink
					to='create'
					className={({ isActive }) =>
						`inline-block px-4 py-2 rounded-lg text-black border-b-4 bg-light  ${
							isActive ? 'border-primary' : 'border-transparent'
						}`
					}
				>
					Create Request
				</NavLink>
			</div>
		</div>
	);
};

export default FeaturedRequestTabs;
