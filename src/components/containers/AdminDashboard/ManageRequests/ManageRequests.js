import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import useSorting from '../../../../hooks/useSorting';
import RequestsTable from '../RequestsTable/RequestsTable';

const ManageRequests = () => {
	const [allRequests, setAllRequests] = useState([]);
	const [displayRequests, setDisplayRequests] = useState([]);
	const { admin, client } = useAxios();
	const [triggerFetching, setTriggerFetching] = useState(true);
	const [isNoOrder, setIsNoOrder] = useState(false);
	const { handleDataSorting } = useSorting();

	useEffect(() => {
		client
			.get('/requests')
			.then((response) => {
				const requests = response.data.requests;
				requests.length ? setIsNoOrder(false) : setIsNoOrder(true);
				setTriggerFetching(false);
				setAllRequests(requests);
				setDisplayRequests(requests);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [triggerFetching]);

	// updating the status
	const handleStatus = (status, _id) => {
		const update = { status };

		admin
			.put(`/status/${_id}`, update)
			.then((response) => {
				console.log(response.data);
				setTriggerFetching(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// handle data filtering and sorting
	const handleDataFilter = (key, order) => {
		const dataSorted = handleDataSorting(key, order, allRequests);
		console.log(dataSorted);
		setDisplayRequests([...dataSorted]);
	};

	// deleting order
	const handleDeleteRequest = (_id) => {
		if (_id) {
			admin.delete(`/request/${_id}`).then((response) => {
				console.log(response);
				if (response.data.acknowledged) {
					// const newDisplayRequests = displayRequests.filter(
					// 	(request) => request._id !== _id
					// );
					// setDisplayRequests(newDisplayRequests);
					setTriggerFetching(true);
				}
			});
		}
	};

	return (
		<div className=''>
			<div className='w-full space-y-4'>
				<h5 className='text-xl font-bold capitalize'>
					Manage Requests
				</h5>
				{displayRequests.length ? (
					<RequestsTable
						displayRequests={displayRequests}
						handleStatus={handleStatus}
						handleDeleteRequest={handleDeleteRequest}
						handleDataFilter={handleDataFilter}
					/>
				) : (
					<div className='w-full flex justify-center items-center h-96'>
						{!isNoOrder ? (
							<CircularProgress color='inherit' />
						) : (
							<p className='flex-grow self-start p-4 bg-red-100 text-red-500 rounded-lg'>
								No Request Data Available
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageRequests;
