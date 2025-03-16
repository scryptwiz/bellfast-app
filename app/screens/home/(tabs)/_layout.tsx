import { Tabs } from 'expo-router';
import { Home, ShoppingBasket, BookOpen, MessageCircle, User } from 'lucide-react-native';
import { View } from 'react-native';
import { COLOR } from '~/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: '#fff',
          borderRadius: 40,
          position: 'absolute',
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 5,
          bottom: 20,
          marginHorizontal: 30,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-p2 text-white' : 'text-s3'} rounded-full p-3`}>
              <Home color={focused ? COLOR.w : COLOR.s3} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Basket',
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-p2 text-white' : 'text-s3'} rounded-full p-3`}>
              <ShoppingBasket color={focused ? COLOR.w : COLOR.s3} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-p2 text-white' : 'text-s3'} rounded-full p-3`}>
              <BookOpen color={focused ? COLOR.w : COLOR.s3} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-p2 text-white' : 'text-s3'} rounded-full p-3`}>
              <MessageCircle color={focused ? COLOR.w : COLOR.s3} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-p2 text-white' : 'text-s3'} rounded-full p-3`}>
              <User color={focused ? COLOR.w : COLOR.s3} size={24} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
