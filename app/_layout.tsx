import '../global.css';

import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedSplashScreen from './screens/onboarding/AnimatedSplashScreen';

export default function Layout () {
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [hasEvereSignedIn, setHasEverSignedIn] = useState<boolean | null>(null);

  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkFirstLaunch = async () => {
      await AsyncStorage.removeItem('hasEverSignedIn');
      const hasSignedIn = await AsyncStorage.getItem('hasEverSignedIn');
      if (hasSignedIn === null) {
        setHasEverSignedIn(true);
      } else {
        setHasEverSignedIn(false);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appReady && splashAnimationFinished && hasEvereSignedIn !== null) {
      if (hasEvereSignedIn) {
        router.push('/screens/onboarding/OnboardingScreen');
      }
    }
  }, [appReady, splashAnimationFinished, hasEvereSignedIn]);

  if (!appReady || !splashAnimationFinished) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) setSplashAnimationFinished(true);
        }}
      />
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}