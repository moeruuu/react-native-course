import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { signIn } from "../../../lib/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await signIn(
        email.trim(),
        password
      );

      router.replace("/home");
    } catch (error) {
      console.error("Sign in error:", error);

      Alert.alert(
        "Sign in failed",
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F7F3E8] px-6 pt-20">
      {/* Logo */}
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#DDE6D0]">
        <Text className="text-3xl">☕</Text>
      </View>

      {/* Header */}
      <Text className="mt-7 text-3xl font-bold text-[#34402B]">
        Welcome back
      </Text>

      <Text className="mt-2 text-base leading-6 text-[#8A806D]">
        Sign in and continue your little food journey.
      </Text>

      {/* Form */}
      <View className="mt-10">
        {/* Email */}
        <Text className="mb-2 text-sm font-semibold text-[#596747]">
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          placeholder="you@example.com"
          placeholderTextColor="#A59C8A"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password */}
        <Text className="mb-2 mt-5 text-sm font-semibold text-[#596747]">
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          placeholder="••••••••"
          placeholderTextColor="#A59C8A"
          secureTextEntry
        />

        {/* Forgot password */}
        <Pressable
          disabled={loading}
          className="mt-3 self-end"
        >
          <Text className="font-medium text-[#718355]">
            Forgot password?
          </Text>
        </Pressable>

        {/* Sign in button */}
        <Pressable
          onPress={handleSignIn}
          disabled={loading}
          className={`mt-7 rounded-2xl py-4 ${
            loading
              ? "bg-[#C5CCB8]"
              : "bg-[#718355]"
          }`}
        >
          <Text className="text-center text-base font-bold text-white">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </Pressable>
      </View>

      {/* Sign up */}
      <View className="mt-8 flex-row justify-center">
        <Text className="text-[#8A806D]">
          Don't have an account?{" "}
        </Text>

        <Link href="/auth/sign-up">
          <Text className="font-bold text-[#718355]">
            Sign up
          </Text>
        </Link>
      </View>
    </View>
  );
}