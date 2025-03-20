import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '~/store/user.store';
import { InteractionManager } from 'react-native';
import { storage } from '~/lib/storage/mmkv';

export default function Index() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    const runNavigation = async () => {
      await InteractionManager.runAfterInteractions(() => {
        const hasSignedIn = storage.getString('hasEverSignedIn');

        if (!hasSignedIn) {
          storage.set('hasEverSignedIn', 'true');
          router.replace('/screens/onboarding/OnboardingScreen');
        } else if (user) {
          router.replace('/screens/home');
        } else {
          router.replace('/screens/auth/Signin');
        }
      });
    };

    runNavigation();
  }, [user]);

  return null;
}
