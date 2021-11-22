const useSorting = () => {
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
	return { handleDataSorting };
};

export default useSorting;
