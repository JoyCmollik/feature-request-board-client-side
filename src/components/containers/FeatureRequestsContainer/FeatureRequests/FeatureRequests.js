import React from 'react';
import { Outlet } from 'react-router';
import FeaturedRequestTabs from '../FeatureRequestTabs/FeatureRequestTabs';

const FeatureRequests = () => {
	return (
		<div className='container mx-auto text-black -mt-10 bg-white rounded-lg overflow-hidden'>
			<FeaturedRequestTabs />
			<div className='bg-white'>
				<Outlet />
			</div>
		</div>
	);
};

export default FeatureRequests;
