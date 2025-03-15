import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from './auth.service';

// Create an Axios instance
const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;