import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import MakeAdmin from '../MakeAdmin/MakeAdmin';

const Dashboard = () => {
	const { user } = useAuth();
	return (
		<div className='p-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
			<div className='grid grid-rows-2 gap-4'>
				<h4 className='bg-light text-4xl text-dark capitalize rounded-lg font-bold p-2'>
					Hello {user?.displayName.split(' ', 1)}!
				</h4>
				<div className='bg-primary rounded-lg'></div>
			</div>
			<MakeAdmin />
		</div>
	);
};

export default Dashboard;
