import { View } from 'react-native';
import LottieView from 'lottie-react-native';

interface AnimatedSplashScreenProps {
	onAnimationFinish?: (isCancelled: boolean) => void;
}

const AnimatedSplashScreen = ({ onAnimationFinish = (isCancelled) => { } }: AnimatedSplashScreenProps) => {

	return (
		<View className='bg-white flex-1 items-center justify-center'>
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
		</View>
	);
}


export default AnimatedSplashScreen;