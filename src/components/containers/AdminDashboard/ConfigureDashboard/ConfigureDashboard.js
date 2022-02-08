import React, { useRef, useEffect, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import useAxios from '../../../../hooks/useAxios';

const ConfigureDashboard = () => {
	const [logo, setLogo] = useState();
	const titleRef = useRef('');
	const descRef = useRef('');
	const [boardDetail, setBoardDetail] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { admin } = useAxios();

	useEffect(() => {
		admin
			.get('/boarddetail')
			.then((response) => {
				setBoardDetail(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChangeInfo = (property) => {
		if (!boardDetail) return;

		setIsLoading(true);

		let data = {};
		if (property === 'title' && titleRef.current.value.length) {
			data = { title: titleRef.current.value };
		} else {
			data = { desc: descRef.current.value };
		}

		admin
			.put(`/boarddetail/${boardDetail._id}`, data)
			.then((response) => {
				console.log(response.data);
				titleRef.current.value = '';
				descRef.current.value = '';
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleChangeLogo = (e) => {
		e.preventDefault();

		if (logo && boardDetail._id) {
			const formData = new FormData();
			formData.append('logo', logo);
			setIsLoading(true);

			console.log(formData);

			admin
				.put(`/boardlogo/${boardDetail._id}`, formData)
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<div className='p-4 space-y-4 '>
			<div
				className='rounded-lg grid lg:grid-cols-2 gap-4'
				style={{ minHeight: '250px' }}
			>
				<div className='box-shadow border rounded-lg flex flex-col items-center space-y-4 p-4'>
					<h4 className='capitalize text-xl text-center font-medium'>
						Change Title
					</h4>
					<h5>Current Title: {boardDetail?.title}</h5>
					<input
						className='bg-light border outline-none p-3 w-full rounded-lg'
						ref={titleRef}
						type='text'
					/>
					<button
						className='bg-btn p-2 w-full rounded-lg'
						onClick={() => handleChangeInfo('title')}
						disabled={isLoading}
					>
						Change Title
					</button>
				</div>
				<div className='box-shadow border rounded-lg p-4 flex flex-col items-center space-y-4'>
					<h4 className='capitalize text-xl font-medium'>
						Change Logo
					</h4>
					<h5>Select the logo here</h5>
					<form
						className='space-y-4 overflow-hidden'
						onSubmit={handleChangeLogo}
					>
						<div className='bg-light rounded-lg p-2 border w-44 lg:w-full lg:flex justify-between'>
							<input
								onChange={(e) => setLogo(e.target.files[0])}
								className='border-none'
								accept='image/*'
								type='file'
							/>

							<span className='hidden lg:block'>
								<BsCameraFill style={{ fontSize: '20px' }} />
							</span>
						</div>
						<input
							className='w-full bg-btn p-2 cursor-pointer rounded-lg'
							type='submit'
							value='Change Logo'
							disabled={isLoading}
						/>
					</form>
				</div>
			</div>
			<div
				className='box-shadow border rounded-lg p-4'
				style={{ minHeight: '250px' }}
			>
				<h4 className='capitalize text-xl text-center font-medium mb-4'>
					Change Title
				</h4>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center'>
					<div className='space-y-4 p-2 bg-light w-full h-full rounded-lg text-center'>
						<h5 className='text-lg font-medium'>
							Current Description
						</h5>
						<p>{boardDetail?.desc}</p>
					</div>
					<div className='space-y-4 '>
						<textarea
							className='bg-light border outline-none p-2 w-full rounded-lg'
							ref={descRef}
							type='text'
							style={{ resize: 'none' }}
						/>
						<button
							className='bg-btn text-white p-2 w-full rounded-lg'
							onClick={() => handleChangeInfo('desc')}
							disabled={isLoading}
						>
							Change Description
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfigureDashboard;
