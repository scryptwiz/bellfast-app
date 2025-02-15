import { FlatList, Image, SafeAreaView, StatusBar, Text, useWindowDimensions, View } from "react-native";
import { data, OnboardingDataProps } from "~/constants/OnboardingData";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation, useAnimatedRef } from "react-native-reanimated";
import OnboardingPaginationComp from "~/components/onboarding/PaginationComp";
import CustomButton from "~/components/onboarding/CustomButton";

const OnboardingScreen = () => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const flatListRef = useAnimatedRef();
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);

	const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
		if (viewableItems[0].index !== null) {
			flatListIndex.value = viewableItems[0].index;
		}
	};
	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		}
	})

	const RenderItem = ({ item, index }: { item: OnboardingDataProps, index: number }) => {
		const imageAnimationStyle = useAnimatedStyle(() => {
			const opacityAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[0, 1, 0],
				Extrapolation.CLAMP,
			);
			const translateYAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[100, 0, 100],
				Extrapolation.CLAMP,
			);
			return {
				opacity: opacityAnimation,
				width: SCREEN_WIDTH * 0.8,
				height: SCREEN_WIDTH * 0.8,
				transform: [{ translateY: translateYAnimation }],
			};
		})

		const textAnimationStyle = useAnimatedStyle(() => {
			const opacityAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[0, 1, 0],
				Extrapolation.CLAMP,
			);
			const translateYAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[100, 0, 100],
				Extrapolation.CLAMP,
			);

			return {
				opacity: opacityAnimation,
				transform: [{ translateY: translateYAnimation }],
			};
		});

		return (
			<View className="px-10 flex-1 justify-around" style={{ width: SCREEN_WIDTH }}>
				<Animated.Image className="mx-auto" source={item.image} style={imageAnimationStyle} />
				<Animated.View style={textAnimationStyle}>
					<Text className="font-bold text-4xl text-s1 mb-3">{item.title}</Text>
					<Text className="text-base font-medium text-s2">{item.text}</Text>
				</Animated.View>
			</View>
		);
	};

	return (
		<SafeAreaView className="bg-white flex-1">
			<StatusBar barStyle="dark-content" />
			<Animated.FlatList
				ref={flatListRef as React.RefObject<FlatList<any>>}
				onScroll={onScroll}
				data={data}
				onViewableItemsChanged={onViewableItemsChanged}
				renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
				keyExtractor={(item) => item.id.toString()}
				scrollEventThrottle={16}
				horizontal={true}
				bounces={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
			/>
			<View className="flex justify-between items-center flex-row pb-5 px-10">
				<OnboardingPaginationComp data={data} x={x} screenWidth={SCREEN_WIDTH} />
				<CustomButton
					flatListRef={flatListRef}
					flatListIndex={flatListIndex}
					dataLength={data.length}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingScreen;