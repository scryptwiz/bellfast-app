import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
	user: any;
	setUser: (user: any) => void;
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