import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function Profile() {
  const handleLogout = () => {
    Alert.alert(
      "Log out?",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: () => router.replace("/onboard"),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Header */}
        <View className="flex-row items-center px-6 pt-14">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
          >
            <Text className="text-2xl text-[#34402B]">‹</Text>
          </Pressable>

          <Text className="ml-4 text-2xl font-bold text-[#34402B]">
            Profile
          </Text>
        </View>

        {/* Profile Card */}
        <View className="mx-6 mt-7 items-center rounded-3xl bg-[#FFFDF7] px-6 py-8">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-[#DDE6D0]">
            <Text className="text-4xl">🌿</Text>
          </View>

          <Text className="mt-5 text-2xl font-bold text-[#34402B]">
            Your Name
          </Text>

          <Text className="mt-1 text-sm text-[#8A806D]">
            you@example.com
          </Text>

          <View className="mt-5 rounded-full bg-[#E2E9D5] px-4 py-2">
            <Text className="text-sm font-semibold text-[#596747]">
              Food lover · Place collector
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="mt-7 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            My collection
          </Text>

          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-3xl bg-[#DDE6D0] p-5">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F3E8]">
                <Text className="text-xl">☕</Text>
              </View>

              <Text className="mt-4 text-3xl font-bold text-[#34402B]">
                8
              </Text>

              <Text className="mt-1 text-sm font-medium text-[#596747]">
                Coffee spots
              </Text>
            </View>

            <View className="flex-1 rounded-3xl bg-[#E8DCC5] p-5">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F3E8]">
                <Text className="text-xl">🍜</Text>
              </View>

              <Text className="mt-4 text-3xl font-bold text-[#4F4637]">
                12
              </Text>

              <Text className="mt-1 text-sm font-medium text-[#80735F]">
                Food places
              </Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="mt-8 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            Settings
          </Text>

          <View className="mt-4 overflow-hidden rounded-3xl bg-[#FFFDF7]">
            {/* Account */}
            <Pressable className="flex-row items-center border-b border-[#EEE8DA] px-5 py-5">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#E2E9D5]">
                <Text className="text-lg">👤</Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="font-semibold text-[#34402B]">
                  Account
                </Text>

                <Text className="mt-1 text-sm text-[#8A806D]">
                  Manage your profile
                </Text>
              </View>

              <Text className="text-xl text-[#A59C8A]">›</Text>
            </Pressable>

            {/* Notifications */}
            <Pressable className="flex-row items-center border-b border-[#EEE8DA] px-5 py-5">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#E8DCC5]">
                <Text className="text-lg">🔔</Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="font-semibold text-[#34402B]">
                  Notifications
                </Text>

                <Text className="mt-1 text-sm text-[#8A806D]">
                  Manage your notifications
                </Text>
              </View>

              <Text className="text-xl text-[#A59C8A]">›</Text>
            </Pressable>

            {/* About */}
            <Pressable className="flex-row items-center px-5 py-5">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#DDE6D0]">
                <Text className="text-lg">♡</Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="font-semibold text-[#34402B]">
                  About
                </Text>

                <Text className="mt-1 text-sm text-[#8A806D]">
                  About My Little Guide
                </Text>
              </View>

              <Text className="text-xl text-[#A59C8A]">›</Text>
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <View className="mt-8 px-6">
          <Pressable
            onPress={handleLogout}
            className="rounded-2xl border border-[#E4CFC5] bg-[#FFFDF7] py-4"
          >
            <Text className="text-center font-bold text-[#A06454]">
              Log Out
            </Text>
          </Pressable>
        </View>

        {/* App version */}
        <Text className="mt-6 text-center text-xs text-[#A59C8A]">
          My Little Guide · Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
