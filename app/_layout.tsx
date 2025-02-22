import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AnimatedSplashScreen from './screens/onboarding/AnimatedSplashScreen';
import { validateToken } from '~/utils/services/auth.service';
import { useUserStore } from '~/store/user.store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout () {
  const { clearUser } = useUserStore();

  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Validate the authentication token
  useEffect(() => {
    AsyncStorage.removeItem('hasEverSignedIn');
    const checkAuthentication = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        clearUser();
      }
      setIsTokenValidated(true);
    };

    if (fontsLoaded) {
      setAppReady(true);
      checkAuthentication();
    }
  }, [fontsLoaded]);

  // Show splash screen until ready
  if (!appReady || !splashAnimationFinished || !isTokenValidated) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) setSplashAnimationFinished(true);
        }}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardAvoidingView>
  );
}
