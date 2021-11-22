import React, { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import FeatureRequestCard from '../FeatureRequestCard/FeatureRequestCard';
import FeatureRequestFilter from '../FeatureRequestFilter/FeatureRequestFilter';
import { BsSearch } from 'react-icons/bs';

const FeatureRequestList = () => {
	const [featureRequests, setFeatureRequests] = useState([]);
	const [displayRequests, setDisplayRequests] = useState([]);
	const [filterStatus, setFilterStatus] = useState('all-status');
	const [sortBy, setSortBy] = useState({
		id: 1,
		type: 'Newest',
		order: 'asc',
		key: 'default',
	});
	const { client } = useAxios();

	// fetching requests
	useEffect(() => {
		client
			.get('/requests')
			.then((response) => {
				setFeatureRequests(response.data);
				setDisplayRequests(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// handle search input value
	const handleSearchValue = (e) => {
		const value = e.target.value;

		if (value.length) {
			const searchedData = featureRequests.filter((data) =>
				data.request_title
					.toLocaleLowerCase()
					.includes(value.toLocaleLowerCase())
			);

			setDisplayRequests(searchedData);
		} else {
			handleData(filterStatus, sortBy);
		}
	};

	// controlling states that were lifted up in component
	const handleFilterStatus = (status) => {
		if (status === filterStatus || !featureRequests.length) return;
		setFilterStatus(status);
		handleData(status, sortBy);
	};

	const handleSetSortBy = (value) => {
		if (sortBy.id === value.id || !featureRequests.length) return;
		setSortBy(value);
		handleData(filterStatus, value);
	};

	const handleData = (filterStatus, sort) => {
		let filteredData = [];

		// filtering
		if (filterStatus === 'all-status') {
			filteredData = [...featureRequests];
		} else {
			filteredData = featureRequests.filter(
				({ status }) => status === filterStatus
			);
		}

		const { order, key } = sort;
		let sortedList = [];
		// sorting
		if (key === 'default') {
			sortedList = [...filteredData];
		} else {
			sortedList = handleDataSorting(key, order, filteredData);
		}
		setDisplayRequests(sortedList);
	};

	// function to handle sorting
	const handleDataSorting = (key, order, data) => {
		// number
		if (key === 'votes' || key === 'comments') {
			if (order === 'asc') {
				console.log('asc');
				return data.sort(function (a, b) {
					return a[key].length - b[key].length;
				});
			} else {
				console.log('desc');
				return data.sort(function (a, b) {
					return b[key].length - a[key].length;
				});
			}
		} else {
			// string
			if (order === 'asc') {
				return data.sort((a, b) =>
					a[key].toLocaleLowerCase() > b[key].toLocaleLowerCase()
						? 1
						: b[key].toLocaleLowerCase() >
						  a[key].toLocaleLowerCase()
						? -1
						: 0
				);
			} else {
				return data.sort((a, b) =>
					b[key].toLocaleLowerCase() > a[key].toLocaleLowerCase()
						? 1
						: a[key].toLocaleLowerCase() >
						  b[key].toLocaleLowerCase()
						? -1
						: 0
				);
			}
		}
	};

	return (
		<div className='grid grid-cols-12' style={{ minHeight: '70vh' }}>
			<div className='hidden lg:block bg-light col-span-4 m-2 rounded-lg'>
				<FeatureRequestFilter
					filterStatus={filterStatus}
					sortBy={sortBy}
					handleFilterStatus={handleFilterStatus}
					handleSetSortBy={handleSetSortBy}
				/>
			</div>
			<div className='col-span-12 lg:col-span-8 p-4 space-y-4'>
				{/* search query */}
				<div className=''>
					<div className='flex items-center space-x box-shadow border rounded-lg'>
						<BsSearch
							style={{ fontSize: '20px', margin: '0 10px' }}
						/>
						<input
							className='outline-none px-2 py-2 w-full'
							type='text'
							onChange={handleSearchValue}
							placeholder='Search by keywords'
						/>
					</div>
				</div>
				{displayRequests &&
					displayRequests.map((featureRequest) => (
						<FeatureRequestCard
							key={featureRequest._id}
							featureRequest={featureRequest}
						/>
					))}
			</div>
		</div>
	);
};

export default FeatureRequestList;
