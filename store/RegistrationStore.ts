import { create } from 'zustand';
import { formatDate } from '~/utils/Date.utils';

interface DatePickerState {
	openDateModal: boolean;
	currentDob: string; // ISO string format
	dob: string; // ISO string format
	maxDob: string; // ISO string format
	setOpenDateModal: (open: boolean) => void;
	setCurrentDob: (date: string) => void;
	setDob: (date: string) => void;
}

export const useDatePickerStore = create<DatePickerState>((set) => ({
	openDateModal: false,
	currentDob: formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18))),
	dob: "",
	maxDob: formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18))),
	setOpenDateModal: (open) => set({ openDateModal: open }),
	setCurrentDob: (date) => set({ currentDob: date }),
	setDob: (date) => set({ dob: date }),
}));
