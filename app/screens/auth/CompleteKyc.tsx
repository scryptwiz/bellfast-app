import { View, Text, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useKycStore } from '~/store/KycStore';
import { useRouter } from 'expo-router';
import MenuHeader from '~/components/layout/MenuHeader';
import StepOne from '~/components/kyc/StepOne';
import StepTwo from '~/components/kyc/StepTwo';

const CompleteKyc = () => {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useKycStore();

  const goBack = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep(currentStep - 1);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne />
        );

      case 2:
        return (
          <StepTwo />
        );

      case 3:
        return (
          <>
            <Text className="mb-6 text-center text-2xl font-bold text-s1">Final Step</Text>
            <Text className="text-center text-base text-gray-700">
              You’ve completed the KYC steps!
            </Text>

            <Pressable
              className="mt-8 rounded-lg bg-purple-700 p-4"
              onPress={() => setCurrentStep(1)}>
              <Text className="text-center text-base font-semibold text-white">Start Over</Text>
            </Pressable>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 items-center justify-start bg-white px-5 py-6">
      <MenuHeader title="Complete KYC" onBackPress={goBack} />
      <ScrollView className="flex h-full w-full max-w-md flex-col">{renderStepContent()}</ScrollView>
    </View>
  );
};

export default CompleteKyc;
