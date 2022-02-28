import React from 'react';
import { motion } from 'framer-motion';

// framer motion animation variants
const headingVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.1,
			duration: 0.4,
			type: 'spring',
			stiffness: 260,
			damp: 40,
		},
	},
};
const subHeadingVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.4,
			duration: 0.4,
			type: 'spring',
			stiffness: 260,
			damp: 40,
		},
	},
};

const FeatureBoard = ({ boardDetail }) => {
	return (
		<div className='bg-dark pt-10 pb-20 px-2 lg:px-0 text-white'>
			<div className='container mx-auto space-y-2'>
				<motion.h2
					variants={headingVariants}
					initial='hidden'
					animate='visible'
					className='text-2xl font-semibold'
				>
					{boardDetail?.title}
				</motion.h2>
				<motion.p
					variants={subHeadingVariants}
					initial='hidden'
					animate='visible'
				>
					{boardDetail?.desc}
				</motion.p>
			</div>
		</div>
	);
};

export default FeatureBoard;
