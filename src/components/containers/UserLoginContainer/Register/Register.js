import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import LoginInput from '../../../shared/LoginInput/LoginInput';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const initialInput = {
	name: '',
	email: '',
	password1: '',
	password2: '',
};

const Register = ({ handleToggleLogin }) => {
	const [inputData, setInputData] = useState(initialInput);
	const { handleRegisterUser, error, setError, isLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const { containerVariants } = useFramerMotion();

	const handleInputs = (e) => {
		setError('');
		const field = e.target.name;
		const value = e.target.value;

		const newInputData = { ...inputData };
		newInputData[field] = value;
		setInputData(newInputData);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		const { name, email, password1, password2 } = inputData;

		if (password1 === password2) {
			handleRegisterUser(name, email, password1, location, navigate);
			setInputData(initialInput);
		} else {
			setError("Passwords don't match");
		}
	};

	return (
		<motion.div
			variants={containerVariants}
			className='h-full w-full space-y-4'
			style={{ maxWidth: '400px' }}
		>
			<form className='space-y-2' onSubmit={handleRegister}>
				<LoginInput
					label='username'
					name='name'
					type='text'
					icon={<FaRegUser />}
					handleInputs={handleInputs}
				/>
				<LoginInput
					label='email'
					name='email'
					type='email'
					icon={<IoMailOutline />}
					handleInputs={handleInputs}
				/>
				<LoginInput
					label='password'
					name='password1'
					type='password'
					icon={<RiLockPasswordLine />}
					handleInputs={handleInputs}
				/>
				<LoginInput
					label='confirm password'
					name='password2'
					type='password'
					icon={<RiLockPasswordFill />}
					handleInputs={handleInputs}
				/>
				{/* TODO: update isLoading */}
				<button
					className='uppercase p-3 w-full rounded-lg bg-btn cursor-pointer'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Registering...' : 'Register'}
				</button>
				{error && <p className='text-red-400'>{error}</p>}
			</form>
			<div className='text-center'>
				Existing user?{' '}
				<button onClick={() => handleToggleLogin(true)}>
					Please Login!
				</button>
			</div>
		</motion.div>
	);
};

export default Register;
