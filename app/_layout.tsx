import '../global.css';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import AnimatedSplashScreen from '~/components/AnimatedSplashScreen';

export default function Layout () {
  const [appReady, setAppReady] = useState(false)
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false)
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true)
    }
  }, [fontsLoaded]);

  if (!appReady || !splashAnimationFinished) {
    return <AnimatedSplashScreen onAnimationFinish={(isCancelled) => {
      if (!isCancelled) setSplashAnimationFinished(true)
    }} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
