import { TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CustomButtonProps {
	flatListRef: React.RefObject<any>;
	flatListIndex: { value: number };
	dataLength: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ flatListRef, flatListIndex, dataLength }) => {
	const router = useRouter();

	const buttonAnimationStyle = useAnimatedStyle(() => {
		return {
			width:
				flatListIndex.value === dataLength - 1
					? withSpring(140)
					: withSpring(60),
			height: 60,
		};
	});
	const arrowAnimationStyle = useAnimatedStyle(() => {
		return {
			width: 30,
			height: 30,
			opacity:
				flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
			transform: [
				{
					translateX:
						flatListIndex.value === dataLength - 1
							? withTiming(100)
							: withTiming(0),
				},
			],
		};
	});
	const textAnimationStyle = useAnimatedStyle(() => {
		return {
			opacity:
				flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
			transform: [
				{
					translateX:
						flatListIndex.value === dataLength - 1
							? withTiming(0)
							: withTiming(-100),
				},
			],
		};
	});
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (flatListIndex.value < dataLength - 1) {
					flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
				} else {
					router.push('/screens/auth/Signin');
				}
			}}>
			<Animated.View className="bg-p1 p-2 rounded-full items-center justify-center" style={[buttonAnimationStyle]}>
				<Animated.Text className="text-white text-base font-bold absolute" style={[textAnimationStyle]}>Get Started</Animated.Text>
				<Animated.View style={[arrowAnimationStyle]} className="absolute text-center">
					<AntDesign name="arrowright" size={24} color="white" className='text-center my-auto' />
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default CustomButton;