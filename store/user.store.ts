// store/user.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '~/lib/storage/mmkv';

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
      storage: createJSONStorage(() => ({
        setItem: (key, value) => storage.set(key, value),
        getItem: (key) => storage.getString(key) ?? null,
        removeItem: (key) => storage.delete(key),
      })),
    }
  )
);
