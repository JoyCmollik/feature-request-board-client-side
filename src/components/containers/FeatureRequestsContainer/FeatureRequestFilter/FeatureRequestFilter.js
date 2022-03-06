import React from 'react';
import { HiCheck } from 'react-icons/hi';
import { BsQuestion } from 'react-icons/bs';
import { motion } from 'framer-motion';

const statusList = [
	'all-status',
	'pending',
	'under-review',
	'planned',
	'in-progress',
	'complete',
];

// fixed data for sorting buttons
const sortItems = [
	{ id: 1, type: 'Newest', order: 'asc', key: 'default' },
	{ id: 2, type: 'votes (higher to lower)', order: 'desc', key: 'votes' },
	{
		id: 3,
		type: 'votes (lower to higher)',
		order: 'asc',
		key: 'votes',
	},
	{
		id: 4,
		type: 'comments (higher to lower)',
		order: 'desc',
		key: 'comments',
	},
	{
		id: 5,
		type: 'comments (lower to higher)',
		order: 'asc',
		key: 'comments',
	},
	{ id: 6, type: 'A-Z', order: 'asc', key: 'request_title' },
	{ id: 7, type: 'Z-A', order: 'desc', key: 'request_title' },
];

const FeatureRequestFilter = (props) => {
	const {
		filterStatus,
		sortBy: sortStatus,
		handleFilterStatus,
		handleSetSortBy,
	} = props;

	return (
		<div className='p-4 space-y-4 text-gray-500'>
			{/* filter by status */}
			<div
				className='rounded-lg bg-white p-2 space-y-2
			 box-shadow'
			>
				<h4 className='uppercase text-lg text-black font-semibold'>
					Filter by status
				</h4>
				<div className='flex flex-wrap'>
					{statusList.map((status, statusIdx) => (
						<button
							key={statusIdx}
							onClick={() => handleFilterStatus(status)}
							className={`capitalize slide-in-fwd-center p-1 rounded-lg font-medium space-x-2 flex items-center mr-2 mb-2 ${
								filterStatus === status
									? 'bg-brand text-black'
									: 'bg-light'
							}`}
						>
							<motion.span
								whileHover={{
									scale: 0.91,
								}}
								transition={{
									type: 'spring',
									stiffness: '250',
								}}
							>
								{status}
							</motion.span>
							<span
								className={`p-1 rounded-lg text-green-700 ${
									filterStatus === status
										? ' bg-light'
										: 'bg-brand '
								}`}
							>
								{filterStatus === status ? (
									<HiCheck />
								) : (
									<BsQuestion />
								)}
							</span>
						</button>
					))}
				</div>
			</div>
			{/* sort items */}
			<div className='rounded-lg bg-white p-2 space-y-2 box-shadow'>
				<h4 className='uppercase text-lg font-semibold text-black'>
					Sort by
				</h4>
				<div className='space-y-2'>
					{sortItems.map((sortInfo, sortIdx) => (
						<button
							key={sortIdx}
							onClick={() => handleSetSortBy(sortInfo)}
							className={`capitalize slide-in-fwd-center w-full px-1 py-2 rounded-lg font-medium space-x-2 flex justify-between items-center mr-2 mb-2 ${
								sortInfo.id === sortStatus.id
									? 'bg-brand text-black'
									: 'bg-light'
							}`}
						>
							<motion.span
								whileHover={{
									x: 4,
								}}
								transition={{
									type: 'spring',
									stiffness: '250',
									damping: 10,
									ease: 'easeOut',
								}}
							>
								{sortInfo.type}
							</motion.span>
							<motion.span
								className={`p-1 rounded-lg text-green-700 ${
									sortInfo.id === sortStatus.id
										? 'slide-in-fwd-center bg-light'
										: 'bg-brand '
								}`}
							>
								{sortInfo.id === sortStatus.id ? (
									<HiCheck />
								) : (
									<BsQuestion />
								)}
							</motion.span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeatureRequestFilter;
