import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import FeatureBoard from '../../shared/FeatureBoard/FeatureBoard';
import Header from '../../shared/Header/Header';
import loadingPng from '../../../images/loading.png';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
	const [boardDetail, setBoardDetail] = useState(null);
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

	return (
		<div className='min-h-screen flex flex-col justify-between'>
			{boardDetail ? (
				<>
					<Header boardDetail={boardDetail} />
					<FeatureBoard boardDetail={boardDetail} />
					<div className='flex-grow'>
						<Outlet />
					</div>
					<Footer />
				</>
			) : (
				<div className='h-screen flex justify-center items-center'>
					<img
						className='object-cover w-28'
						src={loadingPng}
						alt='loadingPics'
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
