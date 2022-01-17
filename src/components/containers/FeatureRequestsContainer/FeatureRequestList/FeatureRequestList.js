import React, { useState, useEffect } from 'react';
import useAxios from '../../../../hooks/useAxios';
import FeatureRequestCard from '../FeatureRequestCard/FeatureRequestCard';
import FeatureRequestFilter from '../FeatureRequestFilter/FeatureRequestFilter';
import { BsSearch } from 'react-icons/bs';
import Pagination from '@mui/material/Pagination';
import loading from '../../../../images/loading.png';

const FeatureRequestList = () => {
	const [featureRequests, setFeatureRequests] = useState([]);
	const [displayRequests, setDisplayRequests] = useState([]);
	const [filterStatus, setFilterStatus] = useState('all-status');
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState({
		id: 1,
		type: 'Newest',
		order: 'asc',
		key: 'default',
	});
	const { client } = useAxios();

	// pagination states
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [dataSize, setDataSize] = useState(5);
	const [dataCount, setDataCount] = useState(0);

	// fetching requests
	useEffect(() => {
		client
			.get(`/requests/?page=${page}&&size=${dataSize}`)
			.then((response) => {
				const requests = response.data.requests;
				setFeatureRequests(requests);
				setDisplayRequests(requests);
				setIsLoading(false);

				// pagination
				const count = response.data.count;
				const newPageCount = Math.ceil(count / dataSize);
				setPageCount(newPageCount);
				setDataCount(count);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [page, dataSize]);

	// pagination functionalities
	const handlePageChange = (e, value) => {
		setPage(value);
		setIsLoading(true);
	};

	const getDataPerPageList = () => {
		let dataSizeList = [];
		for (let i = 5; i <= dataCount; i += 5) {
			dataSizeList.push(i);
		}

		return dataSizeList;
	};

	const handleDataSizePerPage = (e) => {
		setDataSize(e.target.value);
		setPage(1);
		setIsLoading(true);
	};

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
				<div className='flex justify-between items-center space-x-5'>
					<div className='flex-grow flex items-center space-x box-shadow border rounded-lg'>
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
					{/* set dataSize per page */}
					<div className='h-full flex justify-between items-center space-x-1'>
						<label htmlFor='data-size'>show requests</label>
						<select
							className='p-2 border box-shadow rounded-lg outline-none focus:ring-1 focus:ring-primary'
							id='data-size'
							defaultValue={dataSize}
							onChange={handleDataSizePerPage}
						>
							{getDataPerPageList().map((size, sizeIdx) => (
								<option key={sizeIdx} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					{isLoading ? (
						<div className='flex justify-center items-center h-40'>
							<img
								className='w-14 mx-auto'
								src={loading}
								alt='loading icons'
							/>
						</div>
					) : (
						<>
							{displayRequests &&
								displayRequests.map((featureRequest) => (
									<FeatureRequestCard
										key={featureRequest._id}
										featureRequest={featureRequest}
									/>
								))}
							{/* pagination */}
							<Pagination
								count={pageCount}
								page={page}
								onChange={handlePageChange}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeatureRequestList;
