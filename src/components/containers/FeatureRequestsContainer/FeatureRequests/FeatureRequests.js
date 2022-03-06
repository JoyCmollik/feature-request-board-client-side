import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router';
import PrivateRoute from '../../../shared/PrivateRoute/PrivateRoute';
import CreateFeatureRequest from '../CreateFeatureRequest/CreateFeatureRequest';
import FeatureRequestDetailPage from '../FeatureRequestDetailsPage/FeatureRequestDetailPage';
import FeatureRequestList from '../FeatureRequestList/FeatureRequestList';
import FeaturedRequestTabs from '../FeatureRequestTabs/FeatureRequestTabs';
import { motion } from 'framer-motion';

const FeatureRequests = () => {
	const location = useLocation();

	return (
		<motion.div
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
			className='container mx-auto text-black -mt-10 bg-white rounded-lg overflow-hidden'
		>
			<FeaturedRequestTabs />
			<div className='bg-white'>
				<AnimatePresence exitBeforeEnter>
					<Routes location={location} key={location.key}>
						<Route index element={<FeatureRequestList />} />
						<Route
							path='create'
							element={
								<PrivateRoute>
									<CreateFeatureRequest />
								</PrivateRoute>
							}
						/>
						<Route
							path=':_id'
							element={<FeatureRequestDetailPage />}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default FeatureRequests;
