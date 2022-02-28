import axios from 'axios';

const useAxios = () => {
	// https://murmuring-headland-05948.herokuapp.com/
	const client = axios.create({
		baseURL: 'http://localhost:8000/',
	});
	const admin = axios.create({
		baseURL: 'http://localhost:8000/admin',
	});
	return { client, admin };
};

export default useAxios;
