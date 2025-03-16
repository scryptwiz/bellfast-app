import React from 'react';
import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLOR } from '~/constants/Colors';

const TopHeader = ({ user }: { user: any }) => {
  const router = useRouter();
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const isProfileIncomplete = user?.kyc_status === 'unverified';

  return (
    <View className="bg-white px-5 pb-3 pt-4">
      <View className="flex-row items-center justify-between">
        {/* Left: Profile */}
        <Pressable
          onPress={() => router.push('/screens/home/profile')}
          className="flex-row items-center gap-4">
          <Image
            source={{
              uri: user?.profile_image || 'https://via.placeholder.com/150',
            }}
            className="h-12 w-12 rounded-full bg-gray-100"
          />
          <View>
            <Text className="text-lg font-medium text-s1">Hi, {fullName || 'User'}</Text>

            {isProfileIncomplete && (
              <Text className="text-s3 text-sm">
                Please complete your profile{' '}
                <Text className="text-primary font-semibold">here</Text>
              </Text>
            )}
          </View>
        </Pressable>

        <TouchableOpacity className="relative p-2">
          <Bell color={COLOR.s3} size={24} />
          <View className="bg-primary absolute right-1 top-1 h-2 w-2 rounded-full" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopHeader;
