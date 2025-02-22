import axios from 'axios';
import api from './api';

export const validateToken = async (): Promise<boolean> => {
	try {
		const response = await api.get('/auth/validate-jwt');
		console.log('Token Validation Response:', response.data);
		return true;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('Token Validation Error Details:', error.response?.data || error.toJSON());
		} else {
			console.log('Token Validation Error:', error);
		}
		return false;
	}
};
