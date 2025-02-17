import { StatusBar, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { BounceOutLeft, FadeIn, ZoomIn } from 'react-native-reanimated';

interface AnimatedSplashScreenProps {
	onAnimationFinish?: (isCancelled: boolean) => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({ onAnimationFinish = (isCancelled) => { } }: AnimatedSplashScreenProps) => {
	return (
		<Animated.View
			entering={FadeIn.duration(1000)}
			exiting={BounceOutLeft.duration(1000)}
			className='bg-white flex-1 items-center justify-center'
		>
			<StatusBar barStyle="dark-content" />
			<AnimatedLottieView
				autoPlay
				onAnimationFinish={onAnimationFinish}
				loop={false}
				style={{
					width: "80%",
					minWidth: 300,
					minHeight: 300,
					backgroundColor: 'transparent',
				}}
				source={require('~assets/lotties/bellfast-lottie.json')}
			/>
		</Animated.View>
	);
}


export default AnimatedSplashScreen;