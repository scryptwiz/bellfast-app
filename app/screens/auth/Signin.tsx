import { Link } from 'expo-router';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRef, useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { validateFields } from '~/utils/Validation.utils';
import { useLogin } from '~/utils/services/auth.service';
import { useUserStore } from '~/store/user.store';
import { Button } from '~/components/Button';
import Toast, { ToastHandleType } from '~/components/Toast';

const SignIn = () => {
  const toastRef = useRef<ToastHandleType>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { user } = useUserStore();

  const { mutate: login, isPending: isLoading } = useLogin();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignIn = async () => {
    const validations = [
      {
        value: email,
        errorSetter: setEmailError,
        errorMessage: 'Please enter a valid email address.',
        isValid: validateEmail(email),
      },
      {
        value: password,
        errorSetter: setPasswordError,
        errorMessage: 'Please enter your password.',
      },
    ];

    const isFormValid = validateFields(validations);

    if (isFormValid) {
      await login({ role: 'user', email, password });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-p2">
      <StatusBar backgroundColor={COLOR.p2} barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex h-fit items-center justify-center bg-p2">
          <Image
            source={require('~assets/icons/splash-icon-light.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View className="flex-1 bg-white px-8 pb-8 pt-16" style={{ borderTopLeftRadius: 50 }}>
          <View className="mb-10">
            <Text className="text-3xl font-bold text-s1">Sign In</Text>
          </View>
          <View className="flex flex-col">
            <View className="flex flex-col gap-10">
              <View className="flex flex-col gap-2">
                <Text className="ml-2 text-lg font-medium text-s2">Email</Text>
                <TextInput
                  className="rounded-2xl bg-gray-100 p-4 text-lg"
                  placeholder="example@mail.com"
                  value={email}
                  onChangeText={setEmail}
                />
                {emailError ? <Text className="ml-2 text-red-500">{emailError}</Text> : null}
              </View>
              <View className="flex flex-col gap-2">
                <Text className="ml-2 text-lg font-medium text-s2">Password</Text>
                <View className="flex-row items-center rounded-2xl bg-gray-100">
                  <TextInput
                    secureTextEntry={secureTextEntry}
                    className="flex-1 p-4 text-lg"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    className="mr-2 flex items-center justify-center px-2 py-4">
                    {secureTextEntry ? (
                      <Feather name="eye-off" size={20} color="black" />
                    ) : (
                      <Feather name="eye" size={20} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text className="ml-2 text-red-500">{passwordError}</Text> : null}
              </View>
            </View>
            <TouchableOpacity className="mb-7 ml-auto mt-4 flex w-fit">
              <Text className="text-s2">Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              title={isLoading ? 'Signing In...' : 'Sign In'}
              onPress={handleSignIn}
              disabled={isLoading}
              isLoading={isLoading}
              className="mb-7"
            />
            <Button
              title={'Sign In with Google'}
              disabled={isLoading}
              icon={require('~assets/icons/google.png')}
              variant="outline"
              className="mb-7"
            />
            <View className="mt-7 flex flex-row items-center justify-between gap-1">
              <View className="flex flex-row items-center gap-1">
                <Text className="ml-2 text-s2">Don't Have an Account?</Text>
                <TouchableOpacity className="flex w-fit items-center">
                  <Link href={{ pathname: '/screens/auth/Signup' }} className="my-auto">
                    <Text className="text-lg font-bold text-p2"> Sign Up</Text>
                  </Link>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="flex w-fit">
                <Link href={{ pathname: '/screens/auth/Verifytoken' }} className="my-auto">
                  <Text className="text-lg font-bold text-p2">Validate Email</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
