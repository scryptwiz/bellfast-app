import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  MapPin,
  CreditCard,
  Wallet,
  Settings,
  Phone,
  HelpCircle,
  Pencil,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { COLOR } from '~/constants/Colors';
import { useUserStore } from '~/store/user.store';
import { storage } from '~/lib/storage/mmkv';

const Profile = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const email = user?.email || '';
  const isProvider = user?.roles?.includes('provider');
  const isKycUnverified = user?.kyc_status === 'unverified';

  const handleLogout = async () => {
    try {
      storage.clearAll();
      clearUser();

      router.replace('/screens/onboarding/OnboardingScreen');
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 py-6">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-s1">Profile</Text>
        <TouchableOpacity
          onPress={() => router.push('/screens/home/profile')}
          className="flex-row items-center gap-2 rounded-full bg-[#f6f4ff] px-4 py-2">
          <Text className="text-sm font-semibold text-p2">Edit Profile</Text>
          <Pencil size={14} color={COLOR.p2} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View className="mb-8 items-center">
        <Image
          source={{ uri: user?.profile_image || 'https://via.placeholder.com/150' }}
          className="mb-3 h-20 w-20 rounded-full bg-gray-100"
        />
        <Text className="text-lg font-semibold text-s1">{fullName}</Text>
        <Text className="text-sm text-s3">{email}</Text>

        {/* KYC Warning */}
        {isKycUnverified && (
          <TouchableOpacity
            onPress={() => router.push('/screens/auth/CompleteKyc')}
            className="mt-2 rounded-full bg-red-50 px-3 py-1">
            <Text className="text-xs font-medium text-red-500">
              ⚠️ Profile incomplete — tap to verify your KYC
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Options */}
      <View className="flex flex-col gap-5">
        {!isProvider && (
          <ProfileOption
            icon={<User color={COLOR.p2} size={20} />}
            label="Become A Provider"
            onPress={() => router.push('/screens/home/profile')}
          />
        )}

        <ProfileOption
          icon={<MapPin color={COLOR.p2} size={20} />}
          label="Manage Address"
          onPress={() => router.push('/screens/home/profile')}
        />

        <ProfileOption
          icon={<CreditCard color={COLOR.p2} size={20} />}
          label="Payment Methods"
          onPress={() => router.push('/screens/home/profile')}
        />

        <ProfileOption
          icon={<Wallet color={COLOR.p2} size={20} />}
          label="Wallets"
          onPress={() => router.push('/screens/home/profile')}
        />

        <ProfileOption
          icon={<Settings color={COLOR.p2} size={20} />}
          label="Settings"
          onPress={() => router.push('/screens/home/profile')}
        />

        <ProfileOption
          icon={<Phone color={COLOR.p2} size={20} />}
          label="Contact Us"
          onPress={() => router.push('/screens/home/profile')}
        />

        <ProfileOption
          icon={<HelpCircle color={COLOR.p2} size={20} />}
          label="Help & FAQs"
          onPress={() => router.push('/screens/home/profile')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.8}
        className="mt-10 flex-row items-center justify-center rounded-full border border-red-400 px-5 py-3">
        <LogOut size={18} color="#dc2626" />
        <Text className="ml-2 text-base font-semibold text-red-500">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ProfileOption = ({
  icon,
  label,
  onPress,
}: {
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
    <View className="flex flex-row items-center gap-3">
      {icon}
      <Text className="text-base text-s2">{label}</Text>
    </View>
    <ChevronRight color={COLOR.s3} size={20} />
  </TouchableOpacity>
);

export default Profile;
