import { FlatList, Image, SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { data, OnboardingDataProps } from "~/constants/OnboardingData";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";

const OnboardingScreen = () => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const x = useSharedValue(0);
	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		}
	})

	const RenderItem = ({ item }: { item: OnboardingDataProps }) => {
		return (
			<View className="px-10 flex-1 justify-around" style={{ width: SCREEN_WIDTH }}>
				<Image className="mx-auto" source={item.image} style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 }} />
				<View>
					<Text className="font-bold text-4xl text-s1 mb-3">{item.title}</Text>
					<Text className="text-base font-medium text-s2">{item.text}</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView className="bg-white flex-1">
			<FlatList
				onScroll={onScroll}
				data={data}
				renderItem={({ item }) => <RenderItem item={item} />}
				keyExtractor={(item) => item.id.toString()}
				scrollEventThrottle={16}
				horizontal={true}
				bounces={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default OnboardingScreen;