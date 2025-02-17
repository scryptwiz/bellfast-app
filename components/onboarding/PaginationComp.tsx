import { View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { OnboardingDataProps } from "~/constants/OnboardingData";

const OnboardingPaginationComp = ({ data, x, screenWidth }: { data: OnboardingDataProps[], x: any, screenWidth: number }) => {
	const PaginationComp = ({ i }: { i: number }) => {
		const animatedDotStyle = useAnimatedStyle(() => {
			const widthAnimation = interpolate(
				x.value,
				[(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
				[10, 20, 10],
				Extrapolation.CLAMP,
			);
			const opacityAnimation = interpolate(
				x.value,
				[(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
				[0.5, 1, 0.5],
				Extrapolation.CLAMP,
			);
			return {
				width: widthAnimation,
				opacity: opacityAnimation,
			};
		});

		return (
			<Animated.View className="w-3 h-3 rounded-full bg-p2 mx-1" style={animatedDotStyle} />
		)
	};

	return (
		<View className="flex flex-row h-10 justify-center items-center">
			{data.map((_, index) => {
				return (
					<PaginationComp i={index} key={index} />
				)
			})}
		</View>
	)
};

export default OnboardingPaginationComp;