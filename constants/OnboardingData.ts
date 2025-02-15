export interface OnboardingDataProps {
	id: number;
	image: any;
	title: string;
	text: string;
}

export const data = [
	{
		id: 1,
		image: require('~assets/images/image1.png'),
		title: 'Courier Service at Your Home',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		id: 2,
		image: require('~assets/images/image2.png'),
		title: 'Car Services & Expert Nearby You',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		id: 3,
		image: require('~assets/images/image3.png'),
		title: 'Professional House Keeping',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
];