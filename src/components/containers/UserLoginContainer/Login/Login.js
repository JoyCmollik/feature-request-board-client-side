import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LoginInput from '../../../shared/LoginInput/LoginInput';
import { IoMailOutline } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';
import useAuth from '../../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const initialInput = {
	email: '',
	password: '',
};

const Login = ({ handleToggleLogin }) => {
	const [inputData, setInputData] = useState(initialInput);
	const { handleLoginUser, error, setError, isLoading, handleGoogleSignIn } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleInputs = (e) => {
		setError('');
		const field = e.target.name;
		const value = e.target.value;

		const newInputData = { ...inputData };
		newInputData[field] = value;
		setInputData(newInputData);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const { email, password } = inputData;

		handleLoginUser(email, password, location, navigate);
		setInputData(initialInput);
	};

	return (
		<div className='h-full w-full space-y-4' style={{ maxWidth: '400px' }}>
			<button
				className='w-full rounded-lg py-2 border text-black box-shadow flex justify-center items-center space-x-2'
				onClick={() => handleGoogleSignIn(location, navigate)}
			>
				<FcGoogle />
				<span>Sign In With Google</span>
			</button>
			<p className='font-bold text-center'>Or</p>
			<form className='space-y-2' onSubmit={handleLogin}>
				<LoginInput
					label='email'
					name='email'
					type='email'
					icon={<IoMailOutline />}
					handleInputs={handleInputs}
				/>
				<LoginInput
					label='password'
					name='password'
					type='password'
					icon={<RiLockPasswordLine />}
					handleInputs={handleInputs}
				/>
				{/* TODO: update isLoading */}
				<button
					className='uppercase p-3 w-full rounded-lg bg-btn cursor-pointer transform transition duration-100 active:scale'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Logging In...' : 'Login'}
				</button>
				{error && <p className='text-red-400'>{error}</p>}
			</form>
			<div className='text-center'>
				New User?{' '}
				<button
					className='text-dark'
					onClick={() => handleToggleLogin(false)}
				>
					Please Register Yourself!
				</button>
			</div>
		</div>
	);
};

export default Login;
