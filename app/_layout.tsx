import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import AnimatedSplashScreen from './screens/onboarding/AnimatedSplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useValidateToken } from '~/utils/services/auth.service';

// Create QueryClient instance
const queryClient = new QueryClient();

export default function Layout () {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

// Move everything inside AppContent to ensure React Query is available
function AppContent () {
  const { isLoading } = useValidateToken();
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Show splash screen until everything is ready
  if (!fontsLoaded || !splashAnimationFinished || isLoading) {
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
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardAvoidingView>
  );
}
