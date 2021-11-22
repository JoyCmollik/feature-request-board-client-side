import React, { useRef, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import makeAdminIcon from '../../../../images/makeadmin.apng';
import successIcon from '../../../../images/success.apng';

const MakeAdmin = () => {
	const [status, setStatus] = useState({
		banner: true,
		email: false,
		success: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const emailRef = useRef('');
	const { token } = useAuth();
	const { admin } = useAxios();

	const handleStatus = (key) => {
		let newStatus = { ...status };
		for (const iteratingKey in newStatus) {
			newStatus[iteratingKey] = false;
		}
		newStatus[key] = true;
		setStatus(newStatus);
	};

	const handleMakeAdmin = (e) => {
		const email = emailRef.current.value;
		if (email.length) {
			setIsLoading(true);

			admin
				.put(
					'/addadmin',
					{ email },
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					console.log(response);
					if (response.data.modifiedCount) {
						handleStatus('sucess');
						setError('');
					}
					handleStatus('email');
					setError('Email is already an admin!');
				})
				.catch((error) => {
					setError('Something wrong just happened!');
				})
				.finally(() => {
					setIsLoading(false);
				});
		}

		e.preventDefault();
	};

	return (
		<div>
			{status.banner && (
				<div className='bg-brand rounded-lg px-4 py-2 box-shadow h-36 grid grid-cols-2 place-items-center'>
					<div className='w-full space-y-2'>
						<h4 className='text-lg font-bold text-dark text-center capitalize'>
							Dashboard
						</h4>
						<button
							className='w-full bg-btn p-2 rounded-lg'
							onClick={() => handleStatus('email')}
						>
							Make Admin
						</button>
					</div>
					<img
						className='h-28'
						src={makeAdminIcon}
						alt='make admin'
					/>
				</div>
			)}
			{status.email && (
				<div className='bg-brand rounded-lg p-2 box-shadow h-36 space-y-2'>
					<h4 className='text-xl text-center font-medium'>Email</h4>
					<form
						className='w-full flex flex-col space-y-2'
						onSubmit={handleMakeAdmin}
					>
						<input
							className='p-2 box-shadow rounded-lg outline-none border'
							ref={emailRef}
							type='email'
							placeholder='email of the admin'
						/>
						<button
							className='p-2 bg-btn rounded-lg'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? 'on Progress...' : 'Add Admin'}
						</button>
					</form>
				</div>
			)}
			{status.sucess && (
				<div className='bg-brand rounded-lg px-4 py-2 box-shadow h-36 grid grid-cols-2 place-items-center'>
					<div className='w-full space-y-2'>
						<h4 className='text-lg font-bold text-dark text-center capitalize'>
							Admin has been added successfully!
						</h4>
						<button
							className='w-full bg-btn p-2 rounded-lg'
							onClick={() => handleStatus('banner')}
						>
							Add more
						</button>
					</div>
					<img className='h-28' src={successIcon} alt='make admin' />
				</div>
			)}
		</div>
	);
};

export default MakeAdmin;
