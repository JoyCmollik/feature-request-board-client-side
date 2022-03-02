import React from 'react';
import moment from 'moment';
import { Avatar } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const FeatureRequestComment = (props) => {
	const { featureRequestComment, handleCommentDelete, isDeleting } = props;
	const { _id, commentText, user_name, user_img, user_id, createdAt } =
		featureRequestComment;
	const { user } = useAuth();
	const { commentVariant } = useFramerMotion();

	return (
		<motion.div
			variants={commentVariant}
			initial='hidden'
			exit='exit'
			className='flex space-x-2'
		>
			<Avatar
				sx={{ width: '25px', height: '25px', fontSize: '16px' }}
				alt={user_name}
				src={user_img ? user_img : '.'}
			/>
			<div className='space-y-2'>
				<h5>{user_name}</h5>
				<p className='text-sm'>{commentText}</p>
				<div className='text-sm text-gray-400 flex items-center space-x-2'>
					<p>{moment(createdAt).fromNow()}</p>
					{user && user.uid === user_id && (
						<>
							<p className='p-0.5 rounded-lg bg-gray-400 self-center' />
							<button
								onClick={() => {
									handleCommentDelete(_id);
								}}
								disabled={isDeleting?.status}
							>
								{isDeleting?._id === _id ? (
									<span className='text-red-400'>
										deleting...
									</span>
								) : (
									'delete'
								)}
							</button>
						</>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default FeatureRequestComment;
