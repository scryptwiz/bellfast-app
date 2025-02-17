import { StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { BounceOutLeft, FadeIn } from 'react-native-reanimated';

interface AnimatedSplashScreenProps {
	onAnimationFinish?: (isCancelled: boolean) => void;
}

const AnimatedSplashScreen = ({ onAnimationFinish = (isCancelled) => { } }: AnimatedSplashScreenProps) => {
	return (
		<Animated.View
			entering={FadeIn.duration(1000)}
			exiting={BounceOutLeft.duration(1000)}
			className='bg-white flex-1 items-center justify-center'
		>
			<StatusBar barStyle="dark-content" />
			<LottieView
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