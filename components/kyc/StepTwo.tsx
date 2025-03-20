import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Button } from '../Button'
import { useKycStore } from '~/store/KycStore';

const StepTwo = () => {
    const { setCurrentStep } = useKycStore();
    return (
        <View className='py-6 px-4'>
            <Text className="text-left text-s1 text-4xl font-semibold">Phone Number</Text>
            <Text className="mb-6 text-left w-56">Enter your phone number to verify your account.</Text>

            <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="w-full rounded-lg border border-gray-300 p-4 text-base"
            />

            <Button
                title="Continue"
                onPress={() => setCurrentStep(3)}
                className="bg-p2 mt-10"
            />
        </View>
    )
}

export default StepTwo