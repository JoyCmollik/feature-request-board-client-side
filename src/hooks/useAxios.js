import axios from 'axios';

const useAxios = () => {
	// https://murmuring-headland-05948.herokuapp.com/
	const client = axios.create({
		baseURL: 'https://murmuring-headland-05948.herokuapp.com/',
	});
	const admin = axios.create({
		baseURL: 'https://murmuring-headland-05948.herokuapp.com/admin',
	});
	return { client, admin };
};

export default useAxios;
