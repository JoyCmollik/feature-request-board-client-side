import React from 'react';
import Menu from '@mui/material/Menu';

const CustomMenu = ({ anchorEl, setAnchorEl, children }) => {
	const open = Boolean(anchorEl);

	return (
		<Menu
			sx={{ padding: '4px' }}
			anchorEl={anchorEl}
			open={open}
			onClose={() => setAnchorEl(null)}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
		>
			{children}
		</Menu>
	);
};

export default CustomMenu;
