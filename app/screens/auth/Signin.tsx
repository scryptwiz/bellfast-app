import { Link } from "expo-router";
import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleSignIn = () => {
		let valid = true;

		if (!validateEmail(email)) {
			setEmailError('Please enter a valid email address.');
			valid = false;
		} else {
			setEmailError('');
		}

		if (password === '') {
			setPasswordError('Please enter your password.');
			valid = false;
		} else {
			setPasswordError('');
		}

		if (valid) {
			// Call your sign-in function here
			Alert.alert('Sign In', 'Sign in successful!');
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-p2">
			<StatusBar backgroundColor="#513DB0" barStyle="light-content" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View className="h-fit bg-p2 flex justify-center items-center">
					<Image source={require("~assets/icons/splash-icon-light.png")} style={{ width: 200, height: 200 }} />
				</View>
				<View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50 }}>
					<View className="my-10">
						<Text className="text-3xl font-bold text-s1">Sign In</Text>
					</View>
					<View className="flex flex-col">
						<View className="flex flex-col gap-10">
							<View className="flex flex-col gap-2">
								<Text className="text-s2 ml-2 text-lg font-medium">Email</Text>
								<TextInput
									className="rounded-2xl p-4 bg-gray-100 text-lg"
									placeholder="example@mail.com"
									value={email}
									onChangeText={setEmail}
								/>
								{emailError ? <Text className="text-red-500 ml-2">{emailError}</Text> : null}
							</View>
							<View className="flex flex-col gap-2">
								<Text className="text-s2 ml-2 text-lg font-medium">Password</Text>
								<View className="flex-row items-center bg-gray-100 rounded-2xl">
									<TextInput
										secureTextEntry={secureTextEntry}
										className="flex-1 text-lg p-4"
										placeholder="....."
										value={password}
										onChangeText={setPassword}
									/>
									<TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} className="flex items-center justify-center px-2 py-4 mr-2">
										{secureTextEntry ? <Feather name="eye-off" size={20} color="black" /> : <Feather name="eye" size={20} color="black" />}
									</TouchableOpacity>
								</View>
								{passwordError ? <Text className="text-red-500 ml-2">{passwordError}</Text> : null}
							</View>
						</View>
						<TouchableOpacity className="flex ml-auto w-fit mt-4 mb-7">
							<Text className="text-s2">Forgot Password?</Text>
						</TouchableOpacity>
						<TouchableOpacity className="bg-p2 rounded-2xl p-4 mb-7" onPress={handleSignIn}>
							<Text className="text-white text-center text-lg font-bold">Sign In</Text>
						</TouchableOpacity>
						<TouchableOpacity className="border border-p2 rounded-2xl p-4 flex flex-row items-center justify-center gap-5">
							<Image source={require("~assets/icons/google.png")} style={{ width: 20, height: 20 }} />
							<Text className="text-p2 text-center text-lg font-bold">Sign In with Google</Text>
						</TouchableOpacity>
						<View className="mt-7 flex flex-row items-center gap-1">
							<Text className="text-s2 ml-2">Don't Have an Account?</Text>
							<TouchableOpacity className="flex w-fit items-center">
								<Link href={{ pathname: "/screens/auth/Signup" }} className="my-auto">
									<Text className="text-p2 font-bold text-lg"> Sign Up</Text>
								</Link>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignIn;