// store/kyc.store.ts
import { create } from 'zustand';

type RoleType = 'provider' | 'customer' | null;

type KycState = {
  selectedRole: RoleType;
  currentStep: number;
  setSelectedRole: (role: RoleType) => void;
  setCurrentStep: (step: number) => void;
};

export const useKycStore = create<KycState>((set) => ({
  selectedRole: null,
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedRole: (role) => set({ selectedRole: role }),
}));
