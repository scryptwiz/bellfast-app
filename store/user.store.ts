import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
	id: string;
	name: string;
	email: string;
	token: string;
};

type UserStore = {
	user: User | null;
	setUser: (user: User) => void;
	clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);