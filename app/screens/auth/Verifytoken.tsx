import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { COLOR } from '~/constants/Colors';
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { Button } from '~/components/Button';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const VerifyToken = () => {
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null);

  const goback = () => {
    router.replace('/screens/auth/Signin');
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
            onPress={goback}>
            <ChevronLeft size={24} color={COLOR.p2} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 bg-white px-8 pt-16" style={{ borderTopLeftRadius: 50 }}>
          <View className="mb-10">
            <Text className="text-3xl font-bold text-s1">Verification Code</Text>
            <Text className="text-base text-s2">
              Please type the verification code sent to: {emailForVerification}
            </Text>
          </View>
          <View className="flex-1">
            <OtpInput
              numberOfDigits={4}
              focusColor={COLOR.p2}
              autoFocus={true}
              hideStick={true}
              placeholder="****"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onFocus={() => console.log('Focused')}
              onBlur={() => console.log('Blurred')}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
              }}
            />
            <View className="mt-7 flex flex-row items-center gap-1">
              <Text className="ml-2 text-s2">I didn't recieve a code.</Text>
              <TouchableOpacity className="flex w-fit items-center">
                <Link href={{ pathname: '/screens/auth/Signup' }} className="my-auto">
                  <Text className="text-lg font-bold text-p2"> Resend Code</Text>
                </Link>
              </TouchableOpacity>
            </View>
            <Button title="Verify" className="mb-5 mt-auto" />
          </View>
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
