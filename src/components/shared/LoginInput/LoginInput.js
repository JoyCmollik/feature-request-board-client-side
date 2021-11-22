import React from 'react';

const LoginInput = ({ handleInputs, icon, name, label, type }) => {
	return (
		<div className='flex flex-col space-y-1'>
			<label className='capitalize'>{label}</label>
			<div className='w-full flex border border-gray-400 rounded-lg  p-2'>
				<input
					className='outline-none bg-transparent flex-grow'
					name={name}
					onBlur={handleInputs}
					type={type}
					required
					autoComplete='off'
				/>
				<span className='text-xl text-gray-400'>{icon}</span>
			</div>
		</div>
	);
};

export default LoginInput;
