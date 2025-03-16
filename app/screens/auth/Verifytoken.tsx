import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { COLOR } from '~/constants/Colors';
import { Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Button } from '~/components/Button';
import { ChevronLeft, MailCheck, TimerReset } from 'lucide-react-native';
import { validateEmail, validateFields } from '~/utils/Validation.utils';
import { useSendEmailOtp, useVerifyEmailOtp } from '~/utils/services/auth.service';
import { getError } from '~/utils/functions/response.utils';

const { width } = Dimensions.get('window');

const VerifyToken = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [emailError, setEmailError] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { mutate: sendEmailOtpMutation, isPending: sendingEmailOtp } = useSendEmailOtp();
  const { mutate: verifyEmailOtpMutation, isPending: verifyingEmailOtp } = useVerifyEmailOtp();

  const goBack = () => {
    if (step === 'otp') {
      setStep('email');
      setOtp('');
    } else {
      router.replace('/screens/auth/Signin');
    }
  };

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [countdown, step]);

  // Simulated API to send OTP
  const sendOtpToEmail = async () => {
    const isValid = validateFields([
      {
        value: email,
        errorSetter: setEmailError,
        errorMessage: 'Please enter a valid email address',
        isValid: validateEmail,
      },
    ]);

    if (!isValid) return;

    sendEmailOtpMutation(
      { email },
      {
        onSuccess: (data) => {
          setStep('otp');
          setCountdown(60);
          setIsResendDisabled(true);
        },
        onError: (error) => {
          const errData = getError(error);
          setEmailError(errData?.message);
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 4) {
      return;
    }

    verifyEmailOtpMutation({ email, otp });
  };

  const handleResendOtp = () => {
    if (!isResendDisabled) {
      sendOtpToEmail();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-p2">
      <StatusBar backgroundColor={COLOR.p2} barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="relative flex h-fit items-center justify-center bg-p2">
          <Image
            source={require('~assets/icons/splash-icon-light.png')}
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity
            className="absolute left-4 top-4 rounded-lg bg-white p-2"
            onPress={goBack}>
            <ChevronLeft size={24} color={COLOR.p2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 bg-white px-8 pt-16" style={{ borderTopLeftRadius: 50 }}>
          {step === 'email' ? (
            <>
              <Text className="mb-3 text-3xl font-bold text-s1">Enter Your Email</Text>
              <Text className="mb-6 text-base text-s2">
                We'll send a verification code to your email address.
              </Text>
              <View className="flex-row items-center rounded-2xl bg-gray-100 px-4">
                <MailCheck size={20} color={COLOR.s2} />
                <TextInput
                  className="flex-1 p-4 text-lg text-black"
                  placeholder="example@mail.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {emailError ? <Text className="mt-2 text-sm text-red-500">{emailError}</Text> : null}
              <Button
                className="mt-6"
                title={sendingEmailOtp ? 'Sending...' : 'Send OTP'}
                onPress={sendOtpToEmail}
                disabled={sendingEmailOtp}
                isLoading={sendingEmailOtp}
              />
            </>
          ) : (
            <>
              <Text className="mb-3 text-3xl font-bold text-s1">Verification Code</Text>
              <Text className="mb-6 text-base text-s2">Enter the code sent to: {email}</Text>
              <OtpInput
                numberOfDigits={4}
                focusColor={COLOR.p2}
                autoFocus={true}
                hideStick={true}
                placeholder="****"
                blurOnFilled={true}
                type="numeric"
                secureTextEntry={false}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                }}
              />
              <Button
                title={verifyingEmailOtp ? 'Verifying...' : 'Verify OTP'}
                onPress={handleVerifyOtp}
                className="mt-6"
                disabled={otp.length !== 4 || verifyingEmailOtp}
                isLoading={verifyingEmailOtp}
              />
              <View className="mt-6 flex flex-row items-center justify-center">
                {isResendDisabled ? (
                  <Text className="text-s2">Resend code in {countdown}s</Text>
                ) : (
                  <TouchableOpacity
                    onPress={handleResendOtp}
                    className="flex-row items-center gap-1">
                    <TimerReset size={16} color={COLOR.p2} />
                    <Text className="text-lg font-semibold text-p2">Resend Code</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyToken;

const styles = StyleSheet.create({
  pinCodeContainer: {
    width: width * 0.15,
    height: width * 0.15,
  },
  pinCodeText: {
    fontSize: width * 0.06,
    color: COLOR.s2,
  },
});
