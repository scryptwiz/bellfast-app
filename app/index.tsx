import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '~/store/user.store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index () {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    const redirectUser = async () => {
      const hasSignedIn = await AsyncStorage.getItem('hasEverSignedIn');

      if (hasSignedIn === null) {
        await AsyncStorage.setItem('hasEverSignedIn', 'true');
        router.replace('/screens/onboarding/OnboardingScreen');
      } else if (user) {
        router.replace('/screens/home/Home');
      } else {
        router.replace('/screens/auth/Signin');
      }
    };

    redirectUser();
  }, [user]);

  return null; // No UI needed, just redirecting
}
