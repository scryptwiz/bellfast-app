import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignIn = () => {
	return (
		<SafeAreaView className="flex-1 bg-p1">
			<StatusBar backgroundColor="#2B2D63" barStyle="light-content" />
			<View className="h-2/6 bg-p1 flex justify-center items-center">
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
							<TextInput className="rounded-2xl p-4 bg-gray-100 text-lg" placeholder="example@mail.com" />
						</View>
						<View className="flex flex-col gap-2">
							<Text className="text-s2 ml-2 text-lg font-medium">Password</Text>
							<TextInput secureTextEntry={true} className="rounded-2xl p-4 bg-gray-100 text-lg" placeholder="example@mail.com" />
						</View>
					</View>
					<TouchableOpacity className="flex ml-auto w-fit mt-4 mb-7">
						<Text className="text-s2">Forgot Password?</Text>
					</TouchableOpacity>
					<TouchableOpacity className="bg-p1 rounded-2xl p-4 mb-7">
						<Text className="text-white text-center text-lg font-bold">Sign In</Text>
					</TouchableOpacity>
					<TouchableOpacity className="border border-p1 rounded-2xl p-4 flex flex-row items-center justify-center gap-5">
						<Image source={require("~assets/icons/google.png")} style={{ width: 20, height: 20 }} />
						<Text className="text-p1 text-center text-lg font-bold">Sign In with Google</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default SignIn;