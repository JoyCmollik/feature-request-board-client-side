import React from 'react';
import { Outlet } from 'react-router';
import FeaturedRequestTabs from '../FeatureRequestTabs/FeatureRequestTabs';
import { motion, AnimatePresence } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const FeatureRequests = () => {
	const { containerVariants } = useFramerMotion();

	return (
		<motion.div
			variants={containerVariants}
			exit='exit'
			initial='hidden'
			animate='visible'
			className='container mx-auto text-black -mt-10 bg-white rounded-lg overflow-hidden'
		>
			<FeaturedRequestTabs />
			<div className='bg-white'>
				<AnimatePresence exitBeforeEnter>
					<Outlet />
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default FeatureRequests;
