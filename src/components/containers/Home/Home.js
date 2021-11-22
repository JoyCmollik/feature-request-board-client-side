import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import FeatureBoard from '../../shared/FeatureBoard/FeatureBoard';
import Header from '../../shared/Header/Header';

const Home = () => {
	const [boardDetail, setBoardDetail] = useState({});
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
		<>
			<Header boardDetail={boardDetail} />
			<FeatureBoard boardDetail={boardDetail} />
			<Outlet />
		</>
	);
};

export default Home;
