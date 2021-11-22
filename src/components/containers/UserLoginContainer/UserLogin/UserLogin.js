import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';

const UserLogin = () => {
	const [isLogin, setIsLogin] = useState(true);

	const handleToggleLogin = (bool) => {
		setIsLogin(bool);
	};
	return (
		<div
			className='container mx-auto h-full bg-white -mt-10 rounded-lg shadow py-10 space-y-4 flex flex-col'
			style={{ minHeight: '50vh' }}
		>
			<h4 className='text-center text-xl capitalize'>
				{isLogin ? 'Login' : 'Register'}
			</h4>
			<div className='flex-grow flex justify-center'>
				{isLogin ? (
					<Login handleToggleLogin={handleToggleLogin} />
				) : (
					<Register handleToggleLogin={handleToggleLogin} />
				)}
			</div>
		</div>
	);
};

export default UserLogin;
