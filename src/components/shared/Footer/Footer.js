import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-dark text-white px-2 lg:px-0 py-2 mt-8'>
			<div className='container mx-auto py-4 flex justify-center items-center'>
				<p>
					Developed by{' '}
					<a
						className='cursor-pointer text-gray-100 underline'
						target='_blank'
						href='https://www.github.com/joycmollik'
					>
						Joy C Mollik
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
