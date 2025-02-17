import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignUp = () => {
	return (
		<SafeAreaView className="flex-1 bg-p2">
			<StatusBar backgroundColor="#513DB0" barStyle="light-content" />
			<View className="h-2/5 bg-p2 flex justify-center items-center">
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
					<TouchableOpacity className="flex ml-auto w-fit mt-4 mb-10">
						<Text className="text-s2">Forgot Password?</Text>
					</TouchableOpacity>
					<TouchableOpacity className="bg-p2 rounded-2xl p-4 focus:bg-p2">
						<Text className="text-white text-center text-lg font-bold">Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default SignUp;