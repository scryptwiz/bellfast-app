import { useQuery } from '@tanstack/react-query';
import api from './api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useUserStore } from '~/store/user.store';
import { useEffect } from 'react';

// API function to validate token
const fetchValidateToken = async () => {
	const response = await api.get('/auth/validate-jwt');
	return response.data;
};

// Custom hook using TanStack Query
export const useValidateToken = () => {
	const { setUser, clearUser } = useUserStore();

	// Fetch token validation
	const { data, error, isLoading } = useQuery({
		queryKey: ['validateToken'],
		queryFn: fetchValidateToken,
		retry: 1,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	});

	// Handle success & error inside useEffect (prevents infinite loop)
	useEffect(() => {
		if (data) {
			console.log('Token Validation Success:', data);
			setUser(data?.data);
		}

		if (error) {
			if (axios.isAxiosError(error)) {
				Toast.show({
					type: 'error',
					text1: error.response?.data?.message || 'An error occurred',
				});
				console.log('Token Validation Error:', error.response?.data || error);
			} else {
				console.log('Token Validation Unexpected Error:', error);
			}
			clearUser(); // Clear user state if validation fails
		}
	}, [data, error, setUser, clearUser]);

	return { isLoading };
};
