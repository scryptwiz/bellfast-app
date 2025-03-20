import { View, Text, Pressable } from 'react-native'
import { Button } from '../Button';
import { useKycStore } from '~/store/KycStore';
import { CheckCircleIcon } from 'lucide-react-native';
import { COLOR } from '~/constants/Colors';

const roles = [
    {
        key: 'provider',
        title: 'Service Provider',
        description: 'I want to offer services.',
    },
    {
        key: 'customer',
        title: 'Customer',
        description: 'I am looking for service providers.',
    },
] as const;

const StepOne = () => {
    const { selectedRole, setSelectedRole, currentStep, setCurrentStep } = useKycStore();

    return (
        <View className="flex-1 px-4 py-6 gap-14">
            {/* Top Content */}
            <View>
                <Text className="mb-6 text-center text-4xl font-semibold text-s1">Join BellFast as</Text>

                <View className="gap-4">
                    {roles.map((role) => {
                        const isSelected = selectedRole === role.key;
                        return (
                            <Pressable
                                key={role.key}
                                onPress={() => setSelectedRole(role.key)}
                                className={`h-36 rounded-lg border p-4 ${isSelected ? 'border-p2 bg-p2/10' : 'border-gray-200'}`}>
                                <View className="flex flex-1 flex-row items-center justify-between px-5">
                                    <View>
                                        <Text className="text-left text-3xl font-semibold text-s2">{role.title}</Text>
                                        <Text className="text-left text-s2">{role.description}</Text>
                                    </View>
                                    <CheckCircleIcon size={20} color={isSelected ? COLOR.p2 : COLOR.s3} />
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            {/* Bottom Content */}
            <View>
                <Button
                    title="Next"
                    onPress={() => selectedRole && setCurrentStep(2)}
                    className={`${selectedRole ? 'bg-p2' : 'bg-p2/50'}`}
                    disabled={!selectedRole}
                />
                <Text className="mt-4 text-center text-gray-500">
                    You can always switch to any track from your profile
                </Text>
            </View>
        </View>
    )
}

export default StepOne