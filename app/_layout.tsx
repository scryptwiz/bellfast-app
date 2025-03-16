import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import AnimatedSplashScreen from './screens/onboarding/AnimatedSplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useValidateToken } from '~/utils/services/auth.service';
import Toast, { ToastHandleType } from '~/components/Toast';
import { ToastService } from '~/utils/toast.util';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create QueryClient instance
const queryClient = new QueryClient();

export default function Layout() {
  const toastRef = useRef<ToastHandleType>(null);

  useEffect(() => {
    const show = (params: { type: string; text: string; duration?: number }) =>
      toastRef.current?.show({ ...params, duration: params.duration ?? 5000 });
    ToastService.setShowToastFunction(show);

    return () => ToastService.setShowToastFunction(() => {}); // cleanup
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Toast ref={toastRef} />
        <AppContent />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

// Move everything inside AppContent to ensure React Query is available
function AppContent() {
  const { isLoading } = useValidateToken();
  const [splashComplete, setSplashComplete] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded || !splashComplete) {
    return (
      <AnimatedSplashScreen
        apiLoading={isLoading}
        onSplashComplete={() => setSplashComplete(true)}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardAvoidingView>
  );
}
