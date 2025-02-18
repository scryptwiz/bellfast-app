import React from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDatePickerStore } from '~/store/RegistrationStore';
import { formatDate } from '~/utils/Date.utils';

interface CustomDatePickerProps {
	mode?: 'date' | 'time' | 'datetime';
	minimumDate?: Date;
	maximumDate?: Date;
	onDateChange?: (date: Date) => void;
	options?: {
		textHeaderColor?: string;
		textDefaultColor?: string;
		selectedTextColor?: string;
		mainColor?: string;
		textSecondaryColor?: string;
		borderColor?: string;
	};
	[key: string]: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	mode = 'date',
	minimumDate = new Date(1900, 0, 1),
	maximumDate = new Date(),
	onDateChange = () => { },
	options = {
		textHeaderColor: '#513DB0',
		textDefaultColor: '#535763',
		selectedTextColor: '#fff',
		mainColor: '#2B2D63',
		textSecondaryColor: '#3A3A3A',
		borderColor: 'rgba(83,87,99, 0.2)',
	},
	...rest
}) => {
	// Access Zustand store
	const { openDateModal, currentDob, setOpenDateModal, setCurrentDob, setDob } = useDatePickerStore();

	console.log('currentDob', currentDob);
	console.log('openDateModal', openDateModal);
	console.log('minimumDate', minimumDate);
	console.log('maximumDate', maximumDate);

	// Handle date change from the DateTimePicker
	const handleDateChange = (event: any, selectedDate?: Date) => {
		const currentDate = selectedDate || new Date(currentDob);
		setOpenDateModal(false);
		setCurrentDob(formatDate(currentDate));
		setDob(formatDate(currentDate));
		onDateChange(currentDate);
	};

	return (
		<>
			{/* DateTimePicker */}
			{openDateModal && (
				<DateTimePicker
					testID="dateTimePicker"
					value={new Date(currentDob)}
					mode={mode}
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={handleDateChange}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					{...rest}
				/>
			)}
		</>
	);
};

export default CustomDatePicker;