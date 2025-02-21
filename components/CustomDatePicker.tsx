import React from 'react';
import DatePicker from 'react-native-date-picker';
import { COLOR } from '~/constants/Colors';
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
		textHeaderColor: COLOR.p2,
		textDefaultColor: COLOR.s1,
		selectedTextColor: '#fff',
		mainColor: COLOR.P1,
		textSecondaryColor: COLOR.s2,
		borderColor: 'rgba(83,87,99, 0.2)',
	},
	...rest
}) => {
	// Access Zustand store
	const { openDateModal, currentDob, setOpenDateModal, setCurrentDob, setDob } = useDatePickerStore();

	// Handle date change from the DatePicker
	const handleDateChange = (selectedDate: Date) => {
		setOpenDateModal(false);
		setCurrentDob(formatDate(selectedDate));
		setDob(formatDate(selectedDate));
		onDateChange(selectedDate);
	};

	return (
		<>
			{/* DatePicker */}
			{openDateModal && (
				<DatePicker
					modal
					open={openDateModal}
					date={new Date(currentDob)}
					mode={mode}
					onConfirm={(date) => {
						handleDateChange(date);
					}}
					onCancel={() => {
						setOpenDateModal(false);
					}}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					theme="light"
					confirmText="Confirm"
					cancelText="Cancel"
					title="Select Date"
					buttonColor={options.mainColor}
					dividerColor={options.borderColor}
					{...rest}
				/>
			)}
		</>
	);
};

export default CustomDatePicker;