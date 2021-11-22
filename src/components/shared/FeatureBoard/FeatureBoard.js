import React from 'react';

const FeatureBoard = ({ boardDetail }) => {
	return (
		<div className='bg-dark pt-10 pb-20 text-white'>
			<div className='container mx-auto space-y-2'>
				<h2 className='text-2xl font-semibold'>{boardDetail?.title}</h2>
				<p>{boardDetail?.desc}</p>
			</div>
		</div>
	);
};

export default FeatureBoard;
