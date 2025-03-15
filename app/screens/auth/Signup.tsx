import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { useRef, useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomDatePicker from '~/components/CustomDatePicker';
import { useDatePickerStore } from '~/store/RegistrationStore';
import { COLOR } from '~/constants/Colors';
import { validateFields, validatePassword } from '~/utils/Validation.utils';
import { useSignupUser } from '~/utils/services/auth.service';
import Toast, { ToastHandleType } from '~/components/Toast';

const SignUp = () => {
  const toastRef = useRef<ToastHandleType>();

  const { dob, setOpenDateModal, maxDob } = useDatePickerStore();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [dobError, setDobError] = useState('');

  const { mutate: signupUser, isPending } = useSignupUser();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateFullName = (fullName: string) => {
    const words = fullName.trim().split(/\s+/);
    return words.length === 2;
  };

  const handleSignUp = async () => {
    const validations = [
      {
        value: email,
        errorSetter: setEmailError,
        errorMessage: 'Please enter a valid email address.',
        isValid: validateEmail(email),
      },
      {
        value: fullName,
        errorSetter: setFullNameError,
        errorMessage: 'Please enter your full name.',
        isValid: validateFullName(fullName),
      },
      {
        value: password,
        errorSetter: setPasswordError,
        errorMessage:
          'Password must be at least 8 characters long, contain no spaces, at least one symbol, and at least one number.',
        isValid: validatePassword(password),
      },
      { value: dob, errorSetter: setDobError, errorMessage: 'Please select your date of birth.' },
      {
        value: isChecked,
        errorSetter: setTermsError,
        errorMessage: 'You must agree to the terms and conditions.',
      },
    ];

    const isFormValid = validateFields(validations);

    if (isFormValid) {
      await signupUser({
        role: 'user',
        email,
        password,
        confirm_password: password,
        dob,
        first_name: fullName.split(' ')[0],
        last_name: fullName.split(' ')[1],
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-p2">
      <StatusBar backgroundColor={COLOR.p2} barStyle="light-content" />
      <Toast ref={toastRef} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex h-fit items-center justify-center bg-p2">
          <Image
            source={require('~assets/icons/splash-icon-light.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View className="flex-1 bg-white px-8 py-16" style={{ borderTopLeftRadius: 50 }}>
          <View className="mb-10">
            <Text className="text-3xl font-bold text-s1">Sign Up</Text>
          </View>
          <View className="flex flex-col">
            <View className="flex flex-col gap-10">
              <View className="flex flex-col gap-2">
                <Text className="ml-2 text-lg font-medium text-s2">
                  Full Name (First and Last Name)
                </Text>
                <TextInput
                  className="rounded-2xl bg-gray-100 p-4 text-lg"
                  placeholder="Enter your first and last name"
                  value={fullName}
                  onChangeText={setFullName}
                />
                {fullNameError ? <Text className="ml-2 text-red-500">{fullNameError}</Text> : null}
              </View>
              <View className="flex flex-col gap-2">
                <Text className="ml-2 text-lg font-medium text-s2">Date Of Birth</Text>
                <TouchableOpacity
                  className="rounded-2xl bg-gray-100 p-4 text-lg"
                  onPress={() => setOpenDateModal(true)}>
                  <Text className={`${dob ? 'text-s1' : 'text-s2'} text-lg`}>
                    {dob ? dob : 'YYYY-MM-DD'}
                  </Text>
                </TouchableOpacity>
                <CustomDatePicker maximumDate={new Date(maxDob)} />
                {dobError ? <Text className="ml-2 text-red-500">{dobError}</Text> : null}
              </View>
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
                <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>
                  Password must: - Be at least 8 characters long - Contain no spaces - Contain at
                  least one symbol - Contain at least one number
                </Text>
                {passwordError ? <Text className="ml-2 text-red-500">{passwordError}</Text> : null}
              </View>
            </View>
            <View className="mb-7 mt-4 flex-1 flex-col gap-2">
              <View className="flex flex-row items-center gap-2">
                <Checkbox
                  className="m-2"
                  value={isChecked}
                  onValueChange={() => setChecked((prev) => !prev)}
                  color={isChecked ? COLOR.p2 : COLOR.s2}
                />
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity
                    className="flex w-fit items-center"
                    onPress={() => setChecked((prev) => !prev)}>
                    <Text className="text-s2">I Agree With Bellfast's </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex w-fit items-center">
                    <Text className="text-lg text-p2">Terms & Conditions</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {termsError ? <Text className="ml-2 text-red-500">{termsError}</Text> : null}
            </View>
            <TouchableOpacity
              className="mb-7 rounded-2xl bg-p2 p-4"
              onPress={handleSignUp}
              disabled={isPending}>
              <Text className="text-center text-lg font-bold text-white">
                {isPending ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center justify-center gap-5 rounded-2xl border border-p2 p-4">
              <Image
                source={require('~assets/icons/google.png')}
                style={{ width: 20, height: 20 }}
              />
              <Text className="text-center text-lg font-bold text-p2">Sign Up with Google</Text>
            </TouchableOpacity>
            <View className="mt-7 flex flex-row items-center gap-1">
              <Text className="ml-2 text-s2">Already Have an Account?</Text>
              <TouchableOpacity className="flex w-fit items-center">
                <Link href={{ pathname: '/screens/auth/Signin' }} className="my-auto">
                  <Text className="text-lg font-bold text-p2"> Sign In</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
