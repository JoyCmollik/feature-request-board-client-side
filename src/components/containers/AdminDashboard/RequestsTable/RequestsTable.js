import React from 'react';
import RequestRow from '../RequestRow/RequestRow';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { AnimatePresence } from 'framer-motion';

const headingList = [
	{ key: 'user_name', value: 'user Info' },
	{ key: 'request_title', value: 'request Info' },
	{ key: 'votes', value: 'votes' },
	{ key: 'comments', value: 'comments' },
	{ key: 'status', value: 'status' },
	{ key: 'actions', value: 'actions' },
];

const RequestsTable = ({
	displayRequests,
	handleStatus,
	handleDeleteRequest,
	handleDataFilter,
}) => {
	return (
		<div className=' flex flex-col'>
			<div className='-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='overflow-hidden border border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									{headingList.map((heading, index) => (
										<th
											key={index}
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider space-x-2'
										>
											<span>{heading.value}</span>
											<span className=''>
												{heading.key !== 'actions' && (
													<button
														onClick={() =>
															handleDataFilter(
																heading.key,
																'desc'
															)
														}
														className='box-shadow'
													>
														<TiArrowSortedUp
															style={{
																fontSize:
																	'16px',
															}}
														/>
													</button>
												)}
												{heading.key !== 'actions' && (
													<button
														onClick={() =>
															handleDataFilter(
																heading.key,
																'asc'
															)
														}
														className='box-shadow'
													>
														<TiArrowSortedDown
															style={{
																fontSize:
																	'16px',
															}}
														/>
													</button>
												)}
											</span>
										</th>
									))}
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								<AnimatePresence>
									{displayRequests &&
										displayRequests.map((request) => (
											<RequestRow
												key={request._id}
												request={request}
												handleStatus={handleStatus}
												handleDeleteRequest={
													handleDeleteRequest
												}
											/>
										))}
								</AnimatePresence>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestsTable;
