import { Link } from "expo-router";
import "../../global.css";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboard" className="mt-4 text-lg text-blue-500">
        Go to Onboard
      </Link>
      <Link href="/auth/sign-up" className="mt-4 text-lg text-blue-500">
        Go to Sign Up
      </Link>
      <Link href="/auth/sign-in" className="mt-4 text-lg text-blue-500">
        Go to Sign In
      </Link>
    </View>
  );
}