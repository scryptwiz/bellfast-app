import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { useUserStore } from '~/store/user.store';
import { useEffect } from 'react';
import { getError } from '../functions/response.utils';
import { AuthResponseType, LoginCredentialsType, SignupCredentialsType } from '~/types/auth';
import { router } from 'expo-router';
import { ToastService } from '../toast.util';

export const AUTH_TOKEN_KEY = 'authToken';
export const VALIDATE_TOKEN_KEY = 'validateToken';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation<AuthResponseType, unknown, LoginCredentialsType>({
    mutationFn: async (credentials: LoginCredentialsType) => {
      const { data } = await api.post<AuthResponseType>('/auth/login', credentials);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, data?.data?.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;

      return data;
    },
    onSuccess: (data) => {
      setUser(data?.data);
      queryClient.invalidateQueries({ queryKey: [VALIDATE_TOKEN_KEY] });
      ToastService.showToast('success', 'Login successful');
    },
    onError: async (error) => {
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
      // console.error('Login Error:', errData);
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
      ToastService.showToast('success', 'Token Validation Success');
    }

    if (isError) {
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
      console.log('Validation Error:', errData);
      clearUser();
    }
  }, [data, error, isError, setUser, clearUser]);

  return { isLoading };
};

export const useSignupUser = () => {
  const { setUser } = useUserStore();

  return useMutation<AuthResponseType, unknown, SignupCredentialsType>({
    mutationFn: async (credentials: SignupCredentialsType): Promise<AuthResponseType> => {
      const { data } = await api.post('/auth/register', credentials);
      console.log('Signup data', data);
      return data;
    },
    onSuccess: (data) => {
      setUser(data?.data);
      ToastService.showToast('success', data?.message);
    },
    onError: (error) => {
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
      console.error('Signup Error:', errData);
    },
  });
};

export const useVerifyEmailOtp = () => {
  return useMutation<AuthResponseType, unknown, { email: string; otp: string }>({
    mutationFn: async ({ email, otp }) => {
      const { data } = await api.post('/auth/verify-email', { email, otp });
      return data;
    },
    onSuccess: (data) => {
      ToastService.showToast('success', data?.message);
      router.replace('/screens/auth/Signin');
    },
    onError: (error) => {
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
      console.error('Verify OTP Error:', errData);
    },
  });
};
