import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import api from './api';
import { useUserStore } from '~/store/user.store';
import { useEffect } from 'react';
import { getError } from '../functions/response.utils';
import { AuthResponseType, LoginCredentialsType, SignupCredentialsType } from '~/types/auth';
import { useRouter } from 'expo-router';
import { ToastService } from '../toast.util';
import { AUTH_TOKEN_KEY, VALIDATE_TOKEN_KEY } from '~/constants/AuthConstants';
import { storage } from '~/lib/storage/mmkv';

export const useLogin = () => {
  const router = useRouter();

  const { setUser, clearUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation<AuthResponseType, unknown, LoginCredentialsType>({
    mutationFn: async (credentials: LoginCredentialsType) => {
      const { data } = await api.post<AuthResponseType>('/auth/login', credentials);
      storage.set(AUTH_TOKEN_KEY, data?.data?.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.token}`;

      return data;
    },
    onSuccess: (data) => {
      setUser(data?.data);
      queryClient.invalidateQueries({ queryKey: [VALIDATE_TOKEN_KEY] });
      ToastService.showToast('success', 'Login successful');
      router.replace('/screens/home');
    },
    onError: async (error) => {
      clearUser();
      storage.delete(AUTH_TOKEN_KEY);
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
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
    }

    if (isError) {
      clearUser();
      storage.delete(AUTH_TOKEN_KEY);
    }
  }, [data, error, isError, setUser, clearUser]);

  return { isLoading };
};

export const useSignupUser = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  return useMutation<AuthResponseType, unknown, SignupCredentialsType>({
    mutationFn: async (credentials: SignupCredentialsType): Promise<AuthResponseType> => {
      const { data } = await api.post('/auth/register', credentials);
      return data;
    },
    onSuccess: (data) => {
      setUser(data?.data);
      ToastService.showToast('success', data?.message);
      router.replace({
        pathname: '/screens/auth/Verifytoken',
        params: { email: data?.data?.email },
      });
    },
    onError: (error) => {
      const errData = getError(error);
      ToastService.showToast('error', errData?.message);
    },
  });
};

export const useSendEmailOtp = () => {
  return useMutation<AuthResponseType, unknown, { email: string }>({
    mutationFn: async ({ email }) => {
      const { data } = await api.post('/auth/generate-email-otp', { email });
      return data;
    },
  });
};

export const useVerifyEmailOtp = () => {
  const router = useRouter();
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
