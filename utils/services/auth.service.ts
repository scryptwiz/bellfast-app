import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from './api';
import { useUserStore } from '~/store/user.store';
import { useEffect } from 'react';
import { getError } from '../functions/response.utils';

const AUTH_TOKEN_KEY = 'authToken';
const VALIDATE_TOKEN_KEY = 'validateToken';

interface LoginCredentials {
	role: string;
	email: string;
	password: string;
}

interface AuthResponse {
	statusCode: number;
	status: string;
	title: string;
	message: string;
	data: any;
}

const showToast = (type: string, title: string, message?: string) => {
	Toast.show({
		type,
		text1: title,
		text2: message,
	});
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	const { setUser } = useUserStore();

	return useMutation<AuthResponse, unknown, LoginCredentials>({
		mutationFn: async (credentials) => {
			const { data } = await api.post<AuthResponse>('/auth/login', credentials);
			await AsyncStorage.setItem(AUTH_TOKEN_KEY, data?.data?.token);
			api.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;
			return data;
		},
		onSuccess: (data) => {
			setUser(data?.data);
			queryClient.invalidateQueries({ queryKey: [VALIDATE_TOKEN_KEY] });
			showToast('success', 'Success', 'Login successful');
			console.log('Login Success:', data);
		},
		onError: (error) => {
			const errData = getError(error);
			showToast('error', errData?.title, errData?.message);
			console.error('Login Error:', errData);
		},
	});
};

export const useValidateToken = () => {
	const { setUser, clearUser } = useUserStore();

	const { data, error, isLoading, isError } = useQuery({
		queryKey: [VALIDATE_TOKEN_KEY],
		queryFn: async () => {
			const { data } = await api.get('/auth/validate-jwt');
			return data;
		},
		retry: 1,
		staleTime: 1000 * 60 * 30,
	});

	useEffect(() => {
		if (data) {
			setUser(data?.data);
			console.log('Token Validation Success:', data);
		}

		if (isError) {
			const errData = getError(error);
			showToast('error', errData?.title, errData?.message);
			console.log('Validation Error:', errData);
			clearUser();
		}
	}, [data, error, isError, setUser, clearUser]);

	return { isLoading };
};