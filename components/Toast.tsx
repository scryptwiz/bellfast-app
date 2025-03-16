import { Image, StyleSheet, Text } from 'react-native';
import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';

export type ToastHandleType = {
  show: ({ type, text, duration }: { type: string; text: string; duration: number }) => void;
};

const Toast = forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastText, setToastText] = useState('');
  const [toastDuration, setToastDuration] = useState(0);
  const TOP_VALUE = 20;

  const show = useCallback(
    ({ type, text, duration }: { type: string; text: string; duration: number }) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          duration,
          withTiming(-100, {}, (finish) => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          })
        )
      );
    },
    [TOP_VALUE, toastTopAnimation]
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(context.value + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    })
    .onEnd((event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, {}, (finish) => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, {}, (finish) => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            })
          )
        );
      }
    });

  return (
    <>
      {showing && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === 'success'
                ? styles.successToastContainer
                : toastType === 'warning'
                  ? styles.warningToastContainer
                  : styles.errorToastContainer,
              animatedTopStyles,
            ]}>
            {toastType === 'success' && <CheckCircle color="#1f8722" size={30} />}
            {toastType === 'warning' && <AlertTriangle color="#f08135" size={30} />}
            {toastType === 'error' && <XCircle color="#d9100a" size={30} />}
            <Text
              style={[
                styles.toastText,
                toastType === 'success'
                  ? styles.successToastText
                  : toastType === 'warning'
                    ? styles.warningToastText
                    : styles.errorToastText,
              ]}>
              {toastText}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    width: '90%',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  toastText: {
    marginLeft: 14,
    fontSize: 16,
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  successToastContainer: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },
  warningToastContainer: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },
  errorToastContainer: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },
  successToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#d9100a',
  },
});
