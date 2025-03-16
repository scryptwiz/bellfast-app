import { StatusBar, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { BounceOutLeft, FadeIn } from 'react-native-reanimated';
import { useEffect, useRef, useState } from 'react';

interface AnimatedSplashScreenProps {
  apiLoading: boolean;
  onSplashComplete: () => void;
}

const AnimatedSplashScreen = ({ apiLoading, onSplashComplete }: AnimatedSplashScreenProps) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const loaderRef = useRef<LottieView>(null);

  useEffect(() => {
    // When both animation and API are done, proceed
    if (animationFinished && !apiLoading) {
      setTimeout(onSplashComplete, 300); // small buffer
    }

    // If animation finishes first, show looping loader
    if (animationFinished && apiLoading) {
      loaderRef.current?.play();
    }
  }, [animationFinished, apiLoading]);

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={BounceOutLeft.duration(1000)}
      className="flex-1 items-center justify-center bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {!animationFinished ? (
        <LottieView
          autoPlay
          loop={false}
          source={require('~assets/lotties/bellfast-lottie.json')}
          style={styles.lottie}
          onAnimationFinish={() => setAnimationFinished(true)}
        />
      ) : apiLoading ? (
        <LottieView
          ref={loaderRef}
          loop
          autoPlay
          source={require('~assets/lotties/bellfast-lottie.json')}
          style={[styles.lottie, { height: 120, width: 120 }]}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: '80%',
    minWidth: 300,
    minHeight: 300,
    backgroundColor: 'transparent',
  },
});

export default AnimatedSplashScreen;
