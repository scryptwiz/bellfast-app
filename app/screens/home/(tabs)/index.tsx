import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import TopHeader from '~/components/layout/TopHeader';
import { COLOR } from '~/constants/Colors';
import { useUserStore } from '~/store/user.store';

export default function Index() {
  const { user } = useUserStore();

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor={COLOR.w} barStyle="dark-content" />
      <TopHeader user={user} />
    </SafeAreaView>
  );
}
