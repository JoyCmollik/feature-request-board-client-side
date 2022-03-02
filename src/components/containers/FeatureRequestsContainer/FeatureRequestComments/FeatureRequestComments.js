import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import FeatureRequestComment from '../FeatureRequestComment/FeatureRequestComment';
import { motion, AnimatePresence } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const FeatureRequestComments = ({ _id }) => {
	const [featureRequestComments, setFeatureRequestComments] = useState([]);
	const [triggerFetching, setTriggerFetching] = useState(true);
	const [isDeleting, setIsDeleting] = useState({ _id: '', status: false });
	const [isCommenting, setIsCommenting] = useState(false);
	const { user } = useAuth();
	const commentRef = useRef('');
	const { client } = useAxios();
	const { opacityVariant, commentContainerVariant, commentVariant } =
		useFramerMotion();

	// // fetching available comments of this feature post
	useEffect(() => {
		if (triggerFetching) {
			client
				.get(`/comments/${_id}`)
				.then((response) => {
					setTriggerFetching(false);
					setFeatureRequestComments(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [triggerFetching]);

	// function to trigger fetching comments every 10 seconds
	// let interval = setInterval(function () {
	// 	setTriggerFetching(true);
	// }, 10000);

	const handleSubmit = (e) => {
		if (commentRef.current.value) {
			setIsCommenting(true);
			const comment = { commentText: commentRef.current.value };
			// setting initial values
			comment.user_id = user.uid;
			comment.user_name = user.displayName;
			comment.user_img = user.photoURL;
			comment.votes = [];
			comment.request_id = _id;
			comment.createdAt = new Date();

			handleStoreComment(comment, _id);
			commentRef.current.value = '';
		}

		e.preventDefault();
	};

	const handleStoreComment = (comment, request_id) => {
		// storing single comment in the comments collection
		client
			.post('/addcomment', comment)
			.then((response) => {
				const inserted_id = response.data?.insertedId;
				if (inserted_id) {
					// updating comment list of particular feature request
					handleUpdateCommentToRequest(inserted_id, request_id);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleUpdateCommentToRequest = (comment_id, request_id) => {
		client
			.put('/updatecomments', { request_id, comment_id, action: 1 })
			.then((response) => {
				if (response.data.modifiedCount) {
					setIsCommenting(false);
					setTriggerFetching(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// DELETE comment
	const handleCommentDelete = (comment_id) => {
		setIsDeleting({ _id: comment_id, status: true });
		// 1. remove from feature request posts comments array
		// 2. delete from comments collection
		const data = { comment_id, request_id: _id, action: 0 };

		client
			.put(`/updatecomments`, data)
			.then((response) => {
				if (response.data.modifiedCount) {
					handleCommentDeleteFromCollection(comment_id);
					// filtering comment lists
					setFeatureRequestComments(() => {
						return featureRequestComments.filter(
							(comment) => comment._id !== comment_id
						);
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCommentDeleteFromCollection = (comment_id) => {
		client
			.delete(`/comment/${comment_id}`)
			.then((response) => {
				if (response.data.deletedCount) {
					setIsDeleting({ _id: '', status: false });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='space-y-2'>
			{user && (
				<div className='w-full'>
					<form
						className='w-full flex flex-col space-y-4'
						onSubmit={handleSubmit}
					>
						<motion.textarea
							variants={opacityVariant}
							className='shadow h-28 bg-light p-4 outline-none rounded-lg'
							style={{ resize: 'none' }}
							placeholder='Write your comment here...'
							ref={commentRef}
						/>
						<motion.input
							variants={commentVariant}
							className={`self-end px-4 py-2 rounded-lg cursor-pointer transition duration-100 transform ${
								isCommenting
									? 'bg-gray-100'
									: 'hover:scale-95 bg-btn'
							}`}
							type='submit'
							value='Comment'
							disabled={isCommenting}
						/>
					</form>
				</div>
			)}

			<motion.div
				variants={commentContainerVariant}
				initial='hidden'
				animate='visible'
				className='space-y-4'
			>
				<AnimatePresence>
					{featureRequestComments &&
						featureRequestComments.map((featureRequestComment) => (
							<FeatureRequestComment
								key={featureRequestComment._id}
								featureRequestComment={featureRequestComment}
								handleCommentDelete={handleCommentDelete}
								isDeleting={isDeleting}
							/>
						))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default FeatureRequestComments;
