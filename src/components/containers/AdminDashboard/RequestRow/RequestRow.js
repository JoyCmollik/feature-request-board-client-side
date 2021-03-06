import React from 'react';
import { Avatar } from '@mui/material';
import moment from 'moment';
import { motion } from 'framer-motion';

// framer-motion animations

const statusList = [
	'pending',
	'under-review',
	'planned',
	'in-progress',
	'complete',
];

const RequestRow = ({ request, handleStatus, handleDeleteRequest }) => {
	const {
		_id,
		request_title,
		status,
		user_name,
		user_img,
		createdAt,
		comments,
		votes,
	} = request;

	const handleStatusUpdate = (e) => {
		const value = e.target.value;
		handleStatus(value, _id);
	};

	// getting status color
	let statusColor = '';
	switch (status) {
		case 'pending':
			statusColor = ' bg-purple-200 text-purple-500';
			break;
		case 'under-review':
			statusColor = ' bg-indigo-200 text-indigo-500';
			break;
		case 'planned':
			statusColor = ' bg-blue-200 text-blue-500';
			break;
		case 'in-progress':
			statusColor = ' bg-yellow-200 text-yellow-500';
			break;
		default:
			statusColor = ' bg-green-200 text-green-500';
	}

	return (
		<motion.tr
			layout
			exit={{
				opacity: 0,
				x: '100vw',
				transition: {
					duration: 0.4,
					delay: 0.1,
				},
			}}
		>
			{/* user */}
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center'>
					<div className='flex-shrink-0 h-10 w-10'>
						<Avatar
							alt={user_name}
							src={user_img}
							sx={{ width: 40, height: 40 }}
						/>
					</div>
					<div className='ml-4'>
						<div className='text-sm font-medium text-gray-900'>
							{user_name}
						</div>
						<div className='text-sm text-gray-500'>email</div>
					</div>
				</div>
			</td>
			{/* Request Info */}
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='text-sm text-gray-900'>
					{request_title.split(' ', 10).join(' ')}
				</div>
				<div className='text-sm text-gray-500'>
					{moment(createdAt).format('lll')}
				</div>
			</td>
			{/* votes */}
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='text-sm text-gray-900'>
					{votes.length} Votes
				</div>
			</td>
			{/* comments */}
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='text-sm text-gray-900'>
					{comments.length} Comments
				</div>
			</td>

			{/* status */}
			<td className='px-6 py-4 whitespace-nowrap'>
				<select
					onChange={handleStatusUpdate}
					defaultValue={status}
					className={`pl-2 py-1 rounded-lg outline-none ${statusColor}`}
				>
					{statusList.map((status, statusIdx) => (
						<option key={statusIdx} value={status}>
							{status}
						</option>
					))}
				</select>
			</td>
			{/* actions */}
			<td className='px-6 py-4 whitespace-nowrap space-x-2'>
				<button
					onClick={() => handleDeleteRequest(_id)}
					className='px-4 py-1 rounded-lg bg-red-200 text-red-500'
				>
					Delete
				</button>
			</td>
		</motion.tr>
	);
};

export default RequestRow;
