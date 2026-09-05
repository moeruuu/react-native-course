import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { createPlace } from "../../lib/place";

export default function AddPlace() {
  const [type, setType] = useState<"coffee" | "food">("coffee");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Validate input
    if (!name.trim() || !location.trim() || rating === 0) {
      Alert.alert(
        "Missing information",
        "Please enter a place name, location, and rating."
      );
      return;
    }

    try {
      setLoading(true);

      // Send place to backend
      await createPlace({
        name: name.trim(),
        type,
        location: location.trim(),
        rating,
        notes: notes.trim(),
        tags: [],
      });

      Alert.alert(
        "Place saved",
        "Your place has been saved successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (error) {
      console.error("Save place error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to save place."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    location.trim() !== "" &&
    rating > 0;

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 50,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
          >
            <Text className="text-xl text-[#34402B]">
              ‹
            </Text>
          </Pressable>

          <View className="ml-4">
            <Text className="text-2xl font-bold text-[#34402B]">
              Add a place
            </Text>

            <Text className="mt-1 text-sm text-[#8A806D]">
              Save somewhere worth remembering.
            </Text>
          </View>
        </View>

        {/* Place Type */}
        <View className="mt-9">
          <Text className="mb-3 text-sm font-semibold text-[#596747]">
            What kind of place?
          </Text>

          <View className="flex-row gap-3">
            {/* Coffee */}
            <Pressable
              onPress={() => setType("coffee")}
              className={`flex-1 flex-row items-center justify-center rounded-2xl border py-4 ${
                type === "coffee"
                  ? "border-[#718355] bg-[#DDE6D0]"
                  : "border-[#E3DDCD] bg-[#FFFDF7]"
              }`}
            >
              <Text className="mr-2 text-xl">
                ☕
              </Text>

              <Text
                className={`font-bold ${
                  type === "coffee"
                    ? "text-[#34402B]"
                    : "text-[#8A806D]"
                }`}
              >
                Coffee
              </Text>
            </Pressable>

            {/* Food */}
            <Pressable
              onPress={() => setType("food")}
              className={`flex-1 flex-row items-center justify-center rounded-2xl border py-4 ${
                type === "food"
                  ? "border-[#718355] bg-[#DDE6D0]"
                  : "border-[#E3DDCD] bg-[#FFFDF7]"
              }`}
            >
              <Text className="mr-2 text-xl">
                🍜
              </Text>

              <Text
                className={`font-bold ${
                  type === "food"
                    ? "text-[#34402B]"
                    : "text-[#8A806D]"
                }`}
              >
                Food
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Place Name */}
        <View className="mt-7">
          <Text className="mb-2 text-sm font-semibold text-[#596747]">
            Place name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={
              type === "coffee"
                ? "e.g. The Green Bean"
                : "e.g. Little Hanoi"
            }
            placeholderTextColor="#A59C8A"
            className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          />
        </View>

        {/* Location */}
        <View className="mt-5">
          <Text className="mb-2 text-sm font-semibold text-[#596747]">
            Location
          </Text>

          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. District 1, Ho Chi Minh City"
            placeholderTextColor="#A59C8A"
            className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          />
        </View>

        {/* Rating */}
        <View className="mt-7">
          <Text className="mb-3 text-sm font-semibold text-[#596747]">
            Your rating
          </Text>

          <View className="flex-row items-center rounded-2xl bg-[#FFFDF7] px-5 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => setRating(star)}
                className="mr-3"
              >
                <Text
                  className={`text-3xl ${
                    star <= rating
                      ? "text-[#A58B52]"
                      : "text-[#D8D0C0]"
                  }`}
                >
                  ★
                </Text>
              </Pressable>
            ))}

            <Text className="ml-1 text-sm font-semibold text-[#8A806D]">
              {rating > 0
                ? `${rating}.0 / 5`
                : "Tap to rate"}
            </Text>
          </View>
        </View>

        {/* Notes */}
        <View className="mt-7">
          <Text className="mb-2 text-sm font-semibold text-[#596747]">
            Notes
          </Text>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="What did you like about this place?"
            placeholderTextColor="#A59C8A"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="min-h-[130px] rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          />
        </View>

        {/* Preview */}
        <View className="mt-7 rounded-3xl bg-[#E2E9D5] p-5">
          <Text className="text-sm font-semibold text-[#718355]">
            PREVIEW
          </Text>

          <View className="mt-3 flex-row items-center">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#FFFDF7]">
              <Text className="text-2xl">
                {type === "coffee" ? "☕" : "🍜"}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-[#34402B]">
                {name || "Your place"}
              </Text>

              <Text className="mt-1 text-sm text-[#718355]">
                {location || "Your location"}
              </Text>
            </View>

            {rating > 0 && (
              <Text className="font-bold text-[#A58B52]">
                ★ {rating}.0
              </Text>
            )}
          </View>
        </View>

        {/* Save */}
        <Pressable
          onPress={handleSave}
          disabled={!isFormValid || loading}
          className={`mt-8 rounded-2xl py-4 ${
            isFormValid && !loading
              ? "bg-[#718355]"
              : "bg-[#C5CCB8]"
          }`}
        >
          <Text className="text-center text-base font-bold text-white">
            {loading ? "Saving..." : "Save Place"}
          </Text>
        </Pressable>

        {/* Cancel */}
        <Pressable
          onPress={() => router.back()}
          disabled={loading}
          className="mt-4 items-center py-3"
        >
          <Text className="font-semibold text-[#8A806D]">
            Cancel
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}