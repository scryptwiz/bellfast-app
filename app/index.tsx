import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '~/store/user.store';
import { storage } from '~/lib/storage/mmkv';

export default function Index() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    const redirectUser = () => {
      const hasSignedIn = storage.getString('hasEverSignedIn');

      if (hasSignedIn === null) {
        storage.set('hasEverSignedIn', 'true');
        router.replace('/screens/onboarding/OnboardingScreen');
      } else if (user) {
        router.replace('/screens/home');
      } else {
        router.replace('/screens/auth/Signin');
      }
    };

    redirectUser();
  }, [user]);

  return null;
}
