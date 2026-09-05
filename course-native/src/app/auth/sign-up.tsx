import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { signUp } from "../../../lib/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      Alert.alert(
        "Missing information",
        "Please enter your name, email, and password."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await signUp(
        name.trim(),
        email.trim(),
        password
      );

      router.replace("/home");
    } catch (error) {
      console.error("Sign up error:", error);

      Alert.alert(
        "Sign up failed",
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 70,
          paddingBottom: 40,
        }}
      >
        {/* Logo */}
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#DDE6D0]">
          <Text className="text-3xl">🌿</Text>
        </View>

        {/* Header */}
        <Text className="mt-7 text-3xl font-bold text-[#34402B]">
          Create your account
        </Text>

        <Text className="mt-2 text-base leading-6 text-[#8A806D]">
          Start saving the places that make you happy.
        </Text>

        {/* Form */}
        <View className="mt-9">
          {/* Name */}
          <Text className="mb-2 text-sm font-semibold text-[#596747]">
            Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            editable={!loading}
            className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
            placeholder="Your name"
            placeholderTextColor="#A59C8A"
            autoCapitalize="words"
          />

          {/* Email */}
          <Text className="mb-2 mt-5 text-sm font-semibold text-[#596747]">
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

          {/* Sign up button */}
          <Pressable
            onPress={handleSignUp}
            disabled={loading}
            className={`mt-8 rounded-2xl py-4 ${
              loading
                ? "bg-[#C5CCB8]"
                : "bg-[#718355]"
            }`}
          >
            <Text className="text-center text-base font-bold text-white">
              {loading
                ? "Creating account..."
                : "Create Account"}
            </Text>
          </Pressable>
        </View>

        {/* Sign in */}
        <View className="mt-8 flex-row justify-center">
          <Text className="text-[#8A806D]">
            Already have an account?{" "}
          </Text>

          <Link href="/auth/sign-in">
            <Text className="font-bold text-[#718355]">
              Sign in
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}