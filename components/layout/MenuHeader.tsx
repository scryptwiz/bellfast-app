import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLOR } from '~/constants/Colors';

const MenuHeader = ({ title = "Complete KYC", onBackPress }: { title?: string; onBackPress: () => void }) => {
    return (
        <View className="mb-6 flex-row items-center w-full gap-2 py-2 relative z-10">
            <Text className="text-xl font-semibold text-s1 text-center w-full">
                {title}
            </Text>
            <TouchableOpacity className="p-2 absolute" onPress={onBackPress}>
                <ChevronLeft size={24} color={COLOR.p2} />
            </TouchableOpacity>
        </View>
    );
};

export default MenuHeader;
