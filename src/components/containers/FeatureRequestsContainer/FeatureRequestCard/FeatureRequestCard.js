import React, { useState } from 'react';
import { HiThumbUp, HiOutlineThumbUp } from 'react-icons/hi';
import { FaRegComments } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import moment from 'moment';
import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion/dist/es/index';

// 'pending',
// 	'under-review',
// 	'planned',
// 	'in-progress',
// 	'complete',

const FeatureRequestCard = ({ featureRequest }) => {
	const {
		_id,
		request_title,
		request_desc,
		status,
		user_name,
		user_img,
		createdAt,
		comments,
		votes,
	} = featureRequest;
	const { client } = useAxios();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [voteList, setVoteList] = useState([...votes]);

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

	// framer-motion-animations-variants
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			duration: 2,
		},
	};

	return (
		<motion.div
			variants={item}
			className='box-shadow rounded-lg p-4 space-y-2 text-gray-500'
		>
			{/* status & time */}
			<div className='flex justify-between items-center text-sm'>
				<p className={`px-2 py-1 rounded-lg ${statusColor}`}>
					{status}
				</p>
				<p>{moment(createdAt).format('lll')}</p>
			</div>

			{/* title & desc */}
			<div
				onClick={() => navigate(`/home/list/${featureRequest._id}`)}
				className='space-y-2  cursor-pointer'
			>
				<h4 className='text-xl font-medium text-black'>
					{request_title}
				</h4>
				<p className=''>{request_desc}</p>
			</div>

			{/* vote & userInfo & comment */}
			<div className='flex justify-between items-center'>
				{/* vote */}
				<div className='py-2 space-x-2 flex items-center'>
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
				<div className='flex items-center space-x-4'>
					{/* userInfo */}
					<div className='flex items-center space-x-2'>
						<Avatar
							sx={{ width: '28px', height: '28px' }}
							alt={user_name}
							src={user_img ? user_img : '.'}
						/>
						<h5>{user_name}</h5>
					</div>
					{/* comment */}
					<div className='flex items-center space-x-1'>
						<span className='text-xl'>
							<FaRegComments />
						</span>
						<span>{comments.length}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FeatureRequestCard;
