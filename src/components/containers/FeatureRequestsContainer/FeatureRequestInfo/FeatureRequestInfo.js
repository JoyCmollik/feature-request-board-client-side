import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { HiThumbUp, HiOutlineThumbUp } from 'react-icons/hi';
import moment from 'moment';
import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';

const FeatureRequestInfo = ({ featureRequest }) => {
	const {
		_id,
		request_title,
		request_desc,
		status,
		user_name,
		user_img,
		createdAt,
		votes,
	} = featureRequest;
	const [voteList, setVoteList] = useState([...votes]);
	const { user } = useAuth();
	const { client } = useAxios();

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

	const handleRequestVoting = (request_id, user_id) => {
		let newVotes = [];
		if (user_id) {
			if (voteList.indexOf(user_id) === -1) {
				newVotes = [...voteList, user_id];
			} else {
				newVotes = voteList.filter((id) => id !== user_id);
			}

			const data = { request_id, newVotes };

			client
				.put('/updatevotes', data)
				.then((response) => {
					if (response.data.modifiedCount) {
						setVoteList(newVotes);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		return;
	};

	return (
		<div className='space-y-4'>
			<div className='flex space-x-2'>
				<h4 className='text-xl font-medium text-black'>
					{request_title}
				</h4>
				<p
					className={`self-start px-2 py-1 ${statusColor} text-sm rounded-lg`}
				>
					{status}
				</p>
			</div>
			{/* userInfo */}
			<div className='flex items-center space-x-2'>
				<Avatar
					sx={{ width: '28px', height: '28px' }}
					alt={user_name}
					src={user_img ? user_img : '.'}
				/>
				<h5>{user_name}</h5>
			</div>
			{/* request info */}
			<div className='space-y-2'>
				<p className='text-black'>{request_desc}</p>
				<p className='text-sm text-gray-400'>
					{moment(createdAt).format('LL')}
				</p>
			</div>

			{/* vote */}
			<div className='p-2 space-x-2 flex items-center'>
				<button
					onClick={() => handleRequestVoting(_id, user?.uid)}
					className='bg-gray-400 hover:bg-secondary text-white px-2 py-1 rounded-lg text-xl'
				>
					{voteList.indexOf(user?.uid) !== -1 ? (
						<HiThumbUp />
					) : (
						<HiOutlineThumbUp />
					)}
				</button>
				<span className='text-lg'>{voteList.length}</span>
			</div>
		</div>
	);
};

export default FeatureRequestInfo;
