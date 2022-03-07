import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../../hooks/useAxios';
import FeatureRequestComments from '../FeatureRequestComments/FeatureRequestComments';
import FeatureRequestInfo from '../FeatureRequestInfo/FeatureRequestInfo';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const FeatureRequestDetailPage = () => {
	const { _id } = useParams();
	const navigate = useNavigate();
	const [featureRequest, setFeatureRequest] = useState();
	const { client } = useAxios();
	const { containerVariants } = useFramerMotion();

	useEffect(() => {
		client
			.get(`/requests/${_id}`)
			.then((response) => {
				console.log('fetching from detail page');
				// setTriggerFetching(false);
				setFeatureRequest(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// const handleTriggerFetching = (status) => {
	// 	setTriggerFetching(status);
	// };

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			layout
			className='grid grid-cols-12'
			style={{ minHeight: '70vh' }}
		>
			<div className='hidden lg:block bg-light col-span-4 m-2 rounded-lg p-2'>
				<button
					onClick={() => navigate('/home/list')}
					className='block w-full bg-brand text-black py-2 rounded-lg'
				>
					Back to all posts
				</button>
			</div>
			<div className='col-span-12 lg:col-span-8 p-4 space-y-4'>
				{featureRequest && (
					<>
						<FeatureRequestInfo featureRequest={featureRequest} />
						<FeatureRequestComments
							_id={_id}
							// handleTriggerFetching={handleTriggerFetching}
						/>
					</>
				)}
			</div>
		</motion.div>
	);
};

export default FeatureRequestDetailPage;
