import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getPlaceById,
  updatePlace,
} from "../../lib/place";

export default function EditPlace() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [type, setType] = useState<"coffee" | "food">(
    "coffee"
  );
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing place
  useEffect(() => {
    loadPlace();
  }, [id]);

  const loadPlace = async () => {
    if (!id) {
      Alert.alert("Error", "Place ID is missing.");
      return;
    }

    try {
      setLoading(true);

      const place = await getPlaceById(id);

      setType(place.type);
      setName(place.name);
      setLocation(place.location);
      setRating(place.rating);
      setNotes(place.notes || "");
      setTags(place.tags || []);
    } catch (error) {
      console.error("Load place error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to load place."
      );
    } finally {
      setLoading(false);
    }
  };

  // Save changes
  const handleSave = async () => {
    if (!id) {
      Alert.alert("Error", "Place ID is missing.");
      return;
    }

    if (
      !name.trim() ||
      !location.trim() ||
      rating === 0
    ) {
      Alert.alert(
        "Missing information",
        "Please enter a place name, location, and rating."
      );
      return;
    }

    try {
      setSaving(true);

      await updatePlace(id, {
        name: name.trim(),
        type,
        location: location.trim(),
        rating,
        notes: notes.trim(),
        tags,
      });

      Alert.alert(
        "Place updated",
        "Your changes have been saved successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              router.replace({
                pathname: "/place-detail",
                params: {
                  id,
                },
              }),
          },
        ]
      );
    } catch (error) {
      console.error("Update place error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to update place."
      );
    } finally {
      setSaving(false);
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    location.trim() !== "" &&
    rating > 0;

  // Loading screen
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F3E8]">
        <Text className="text-base text-[#8A806D]">
          Loading place...
        </Text>
      </View>
    );
  }

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
            disabled={saving}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
          >
            <Text className="text-xl text-[#34402B]">
              ‹
            </Text>
          </Pressable>

          <View className="ml-4">
            <Text className="text-2xl font-bold text-[#34402B]">
              Edit place
            </Text>

            <Text className="mt-1 text-sm text-[#8A806D]">
              Update your place details.
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
              disabled={saving}
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
              disabled={saving}
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
            editable={!saving}
            placeholder="e.g. The Green Bean"
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
            editable={!saving}
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
                disabled={saving}
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
            editable={!saving}
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
          disabled={!isFormValid || saving}
          className={`mt-8 rounded-2xl py-4 ${
            isFormValid && !saving
              ? "bg-[#718355]"
              : "bg-[#C5CCB8]"
          }`}
        >
          <Text className="text-center text-base font-bold text-white">
            {saving ? "Saving..." : "Save Changes"}
          </Text>
        </Pressable>

        {/* Cancel */}
        <Pressable
          onPress={() => router.back()}
          disabled={saving}
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