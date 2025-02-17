import { Link } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, Modal } from "react-native";
import { formatDate } from "~/utils/Date.utils";
import CustomDatePicker from "~/components/CustomDatePicker";

const SignUp = () => {
	const today = new Date();
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [fullNameError, setFullNameError] = useState('');
	const [isChecked, setChecked] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false)
	const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
	const [maxDob,] = useState(formatDate(eighteenYearsAgo))
	const [currentDob, setCurrentDob] = useState(formatDate(eighteenYearsAgo))
	const [dob, setDob] = useState("");

	const handleDateChange = (date: string) => {
		setCurrentDob(date)
		setDob(date)
		setOpenDateModal(false)
	}


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

		if (fullName === '') {
			setFullNameError('Please enter your full name.');
			valid = false;
		} else {
			setFullNameError('');
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
				<View className="flex-1 bg-white px-8 py-16" style={{ borderTopLeftRadius: 50 }}>
					<View className="mb-10">
						<Text className="text-3xl font-bold text-s1">Sign Up</Text>
					</View>
					<View className="flex flex-col">
						<View className="flex flex-col gap-10">
							<View className="flex flex-col gap-2">
								<Text className="text-s2 ml-2 text-lg font-medium">Full Name</Text>
								<TextInput
									className="rounded-2xl p-4 bg-gray-100 text-lg"
									placeholder="Full Name"
									value={fullName}
									onChangeText={setFullName}
								/>
								{fullNameError ? <Text className="text-red-500 ml-2">{fullNameError}</Text> : null}
							</View>
							<View className="flex flex-col gap-2">
								<Text className="text-s2 ml-2 text-lg font-medium">Date Of Birth</Text>
								<TouchableOpacity className="rounded-2xl p-4 bg-gray-100 text-lg" onPress={() => setOpenDateModal(true)}>
									<Text className={`${dob ? "text-s1" : "text-s2"} text-lg`}>{dob ? dob : "YYYY-MM-DD"}</Text>
								</TouchableOpacity>
								{fullNameError ? <Text className="text-red-500 ml-2">{fullNameError}</Text> : null}
							</View>
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
										placeholder="........."
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
						<View className="flex-1 flex-row items-center gap-2 mt-4 mb-7">
							<Checkbox
								className="m-2"
								value={isChecked}
								onValueChange={() => setChecked(prev => !prev)}
								color={isChecked ? '#513DB0' : '#535763'}
							/>
							<View className="flex flex-row items-center gap-1">
								<Text className="text-s2">I Agree With Bellfast's </Text>
								<TouchableOpacity className="flex items-center w-fit"><Text className="text-p2 text-lg">Terms & Conditions</Text></TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity className="bg-p2 rounded-2xl p-4 mb-7" onPress={handleSignIn}>
							<Text className="text-white text-center text-lg font-bold">Sign Up</Text>
						</TouchableOpacity>
						<TouchableOpacity className="border border-p2 rounded-2xl p-4 flex flex-row items-center justify-center gap-5">
							<Image source={require("~assets/icons/google.png")} style={{ width: 20, height: 20 }} />
							<Text className="text-p2 text-center text-lg font-bold">Sign Up with Google</Text>
						</TouchableOpacity>
						<View className="mt-7 flex flex-row items-center gap-1">
							<Text className="text-s2 ml-2">Already Have an Account?</Text>
							<TouchableOpacity className="flex w-fit items-center">
								<Link href={{ pathname: "/screens/auth/Signin" }} className="my-auto">
									<Text className="text-p2 font-bold text-lg"> Sign In</Text>
								</Link>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* Date Picker Modal */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={openDateModal}
				>
					<View className="flex-1 justify-center items-center">
						<View className="m-5 bg-white rounded-2xl w-11/12 p-8 items-center shadow-2xl">
							<CustomDatePicker
								current={`${currentDob}`}
								minimumDate="1900/01/01"
								maximumDate={`${maxDob}`}
								onDateChange={handleDateChange}
							/>
							<TouchableOpacity onPress={() => setOpenDateModal(false)} className="p-4">
								<Text className="text-s2">Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</ScrollView>
		</SafeAreaView>
	);
}

export default SignUp;