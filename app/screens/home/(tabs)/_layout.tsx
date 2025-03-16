import { Tabs } from 'expo-router';
import { Home, ShoppingBasket, BookOpen, MessageCircle, User } from 'lucide-react-native';
import { View, Text } from 'react-native';
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
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`rounded-full p-2 ${focused ? 'bg-p2' : ''}`}>
                <Home color={focused ? COLOR.w : COLOR.s3} size={24} />
              </View>
              {!focused && (
                <Text className="w-[45px] text-center text-[11px] text-s2" numberOfLines={1}>
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`rounded-full p-2 ${focused ? 'bg-p2' : ''}`}>
                <ShoppingBasket color={focused ? COLOR.w : COLOR.s3} size={24} />
              </View>
              {!focused && (
                <Text className="w-[45px] text-center text-[11px] text-s2" numberOfLines={1}>
                  Services
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Booking',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`rounded-full p-2 ${focused ? 'bg-p2' : ''}`}>
                <BookOpen color={focused ? COLOR.w : COLOR.s3} size={24} />
              </View>
              {!focused && (
                <Text className="w-[45px] text-center text-[11px] text-s2" numberOfLines={1}>
                  Booking
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`rounded-full p-2 ${focused ? 'bg-p2' : ''}`}>
                <MessageCircle color={focused ? COLOR.w : COLOR.s3} size={24} />
              </View>
              {!focused && (
                <Text className="w-[45px] text-center text-[11px] text-s2" numberOfLines={1}>
                  Chats
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`rounded-full p-2 ${focused ? 'bg-p2' : ''}`}>
                <User color={focused ? COLOR.w : COLOR.s3} size={24} />
              </View>
              {!focused && (
                <Text className="w-[45px] text-center text-[11px] text-s2" numberOfLines={1}>
                  Profile
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
