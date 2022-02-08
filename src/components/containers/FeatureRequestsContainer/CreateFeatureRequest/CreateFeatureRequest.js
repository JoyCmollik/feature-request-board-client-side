import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';

const CreateFeatureRequest = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();
	const { client } = useAxios();
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		// setting initial request properties
		data.user_id = user.uid;
		data.user_name = user.displayName;
		data.user_img = user.photoURL;
		data.votes = [];
		data.comments = [];
		data.createdAt = new Date();
		data.status = 'pending';
		console.log(data);

		// sending data to server
		client
			.post('/featureRequest', data)
			.then((response) => {
				if (response?.data?.insertedId) {
					reset();
					navigate('/home');
				}
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div
			className='flex flex-col justify-center items-center'
			style={{ minHeight: '50vh' }}
		>
			<h4 className='uppercase text-xl'>Create a feature request</h4>
			<div className='h-full w-full' style={{ maxWidth: '700px' }}>
				<form
					className='flex flex-col space-y-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* input */}
					<div className='flex flex-col space-y-2'>
						<label className='uppercase'>Give a title</label>
						<input
							className='w-full bg-light rounded border px-4 py-2 outline-none'
							{...register('request_title', {
								required: true,
								maxLength: 50,
							})}
							placeholder='Please write a short title'
						/>
						{/* error */}
						{errors.request_title?.type === 'required' && (
							<p className='slide-in-fwd-center px-4 py-1 rounded-lg bg-red-100 text-red-700'>
								Request title is required
							</p>
						)}
						{errors.request_title?.type === 'maxLength' && (
							<p className='slide-in-fwd-center px-4 py-1 rounded-lg bg-red-100 text-red-700'>
								Length should be exceeding 50 characters
							</p>
						)}
					</div>

					{/* input */}
					<div className='flex flex-col space-y-2'>
						<label className='uppercase'>Details</label>
						<textarea
							className='w-full h-28 bg-light rounded border px-4 py-2 outline-none'
							{...register('request_desc', {
								required: true,
								maxLength: 250,
							})}
							style={{ resize: 'none' }}
							placeholder='Additional details of your request'
						/>
						{/* error */}
						{errors.request_desc?.type === 'required' && (
							<p className='slide-in-fwd-center px-4 py-1 rounded-lg bg-red-100 text-red-700'>
								Request Details is required
							</p>
						)}
						{errors.request_desc?.type === 'maxLength' && (
							<p className='slide-in-fwd-center px-4 py-1 rounded-lg bg-red-100 text-red-700'>
								Length should be exceeding 250 characters
							</p>
						)}
					</div>
					<button
						className='uppercase p-3 w-full rounded-lg bg-btn cursor-pointer transform transition duration-100 active:scale'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateFeatureRequest;
