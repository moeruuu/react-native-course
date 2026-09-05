import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Onboard() {
  return (
    <View className="flex-1 bg-[#F7F3E8] px-6">
      <View className="flex-1 items-center justify-center">
        {/* Illustration */}
        <View className="h-64 w-64 items-center justify-center rounded-full bg-[#DDE6D0]">
          <View className="h-40 w-40 items-center justify-center rounded-full bg-[#FFFDF7]">
            <Text className="text-7xl">☕</Text>
          </View>
        </View>

        {/* Title */}
        <Text className="mt-10 text-center text-4xl font-bold text-[#34402B]">
          Find your little
        </Text>

        <Text className="text-center text-4xl font-bold text-[#718355]">
          happy places
        </Text>

        {/* Description */}
        <Text className="mt-5 text-center text-base leading-6 text-[#8A806D]">
          Save your favorite coffee shops and food places,
          so you never forget a place worth coming back to.
        </Text>
      </View>

      {/* Buttons */}
      <View className="pb-10">
        <Link href="/auth/sign-up" asChild>
          <Pressable className="rounded-2xl bg-[#718355] py-4">
            <Text className="text-center text-base font-bold text-white">
              Get Started
            </Text>
          </Pressable>
        </Link>

        <View className="mt-5 flex-row justify-center">
          <Text className="text-[#8A806D]">
            Already have an account?{" "}
          </Text>

          <Link href="/auth/sign-in">
            <Text className="font-bold text-[#718355]">
              Sign in
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}