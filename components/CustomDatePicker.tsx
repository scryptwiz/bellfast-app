import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

interface CustomDatePickerProps {
	options?: {
		textHeaderColor?: string;
		textDefaultColor?: string;
		selectedTextColor?: string;
		mainColor?: string;
		textSecondaryColor?: string;
		borderColor?: string;
	};
	mode?: 'calendar' | 'datepicker' | 'time' | 'monthYear';
	current?: string;
	minimumDate?: string;
	maximumDate?: string;
	onDateChange?: (date: string) => void;
	[key: string]: any;
}

// fix warning: Support for defaultProps will be removed in React v17. Use a default value instead.
const error = console.error;

console.error = (...args) => {
	if (/defaultProps/.test(args[0])) return;
	error(...args);
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	options = {
		textHeaderColor: '#513DB0',
		textDefaultColor: '#535763',
		selectedTextColor: '#fff',
		mainColor: '#2B2D63',
		textSecondaryColor: '#3A3A3A',
		borderColor: 'rgba(83,87,99, 0.2)',
	},
	mode = 'calendar',
	current = '2023-01-01',
	minimumDate = '1900-01-01',
	maximumDate = '2023-12-31',
	onDateChange = () => { },
	...rest
}) => {
	return (
		<DatePicker
			options={options}
			mode={mode}
			current={current}
			minimumDate={minimumDate}
			maximumDate={maximumDate}
			onDateChange={onDateChange}
			{...rest}
		/>
	);
};

export default CustomDatePicker;
