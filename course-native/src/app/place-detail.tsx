import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  deletePlace,
  getPlaceById,
  Place,
} from "../../lib/place";

export default function PlaceDetail() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadPlace();
  }, [id]);

  const loadPlace = async () => {
    if (!id) {
      Alert.alert("Error", "Place ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getPlaceById(id);

      setPlace(data);
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

  const handleDelete = () => {
    if (!place || !id) {
      return;
    }

    Alert.alert(
      "Delete Place",
      `Are you sure you want to delete "${place.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    if (!id) {
      return;
    }

    try {
      setDeleting(true);

      await deletePlace(id);

      Alert.alert(
        "Place deleted",
        "The place has been deleted successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/places"),
          },
        ]
      );
    } catch (error) {
      console.error("Delete place error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to delete place."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F3E8]">
        <Text className="text-base text-[#8A806D]">
          Loading place...
        </Text>
      </View>
    );
  }

  // Place not found
  if (!place) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F3E8] px-6">
        <Text className="text-xl font-bold text-[#34402B]">
          Place not found
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="mt-5 rounded-2xl bg-[#718355] px-6 py-4"
        >
          <Text className="font-bold text-white">
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }

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
            disabled={deleting}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
          >
            <Text className="text-2xl text-[#34402B]">
              ‹
            </Text>
          </Pressable>

          <Text className="ml-4 text-2xl font-bold text-[#34402B]">
            Place details
          </Text>
        </View>

        {/* Hero */}
        <View className="mx-6 mt-7 overflow-hidden rounded-3xl bg-[#FFFDF7]">
          <View
            className={`h-56 items-center justify-center ${
              place.type === "coffee"
                ? "bg-[#C9D6B5]"
                : "bg-[#E5D8BF]"
            }`}
          >
            <View className="h-28 w-28 items-center justify-center rounded-full bg-[#F7F3E8]">
              <Text className="text-6xl">
                {place.type === "coffee"
                  ? "☕"
                  : "🍜"}
              </Text>
            </View>
          </View>

          <View className="p-6">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-2xl font-bold text-[#34402B]">
                  {place.name}
                </Text>

                <Text className="mt-2 text-sm text-[#8A806D]">
                  {place.location}
                </Text>
              </View>

              <View className="flex-row items-center rounded-full bg-[#F0E7D5] px-3 py-2">
                <Text className="font-bold text-[#A58B52]">
                  ★ {place.rating}
                </Text>
              </View>
            </View>

            {/* Type */}
            <View className="mt-5 flex-row items-center">
              <View className="rounded-full bg-[#DDE6D0] px-4 py-2">
                <Text className="text-sm font-semibold capitalize text-[#596747]">
                  {place.type === "coffee"
                    ? "☕"
                    : "🍜"}{" "}
                  {place.type}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View className="mt-7 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            My notes
          </Text>

          <View className="mt-3 rounded-3xl bg-[#FFFDF7] p-5">
            <Text className="text-base leading-6 text-[#665E50]">
              {place.notes || "No notes yet."}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View className="mt-7 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            Tags
          </Text>

          {place.tags && place.tags.length > 0 ? (
            <View className="mt-3 flex-row flex-wrap gap-2">
              {place.tags.map((tag) => (
                <View
                  key={tag}
                  className="rounded-full bg-[#E2E9D5] px-4 py-2"
                >
                  <Text className="text-sm font-semibold text-[#596747]">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text className="mt-3 text-sm text-[#8A806D]">
              No tags yet.
            </Text>
          )}
        </View>

        {/* Location */}
        <View className="mt-7 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            Location
          </Text>

          <View className="mt-3 flex-row items-center rounded-3xl bg-[#E8DCC5] p-5">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F3E8]">
              <Text className="text-xl">📍</Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold text-[#4F4637]">
                {place.location}
              </Text>

              <Text className="mt-1 text-sm text-[#80735F]">
                Location details
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="mt-8 px-6">
          {/* Edit */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit-place",
                params: {
                  id: place._id,
                },
              })
            }
            disabled={deleting}
            className="rounded-2xl bg-[#718355] py-4"
          >
            <Text className="text-center text-base font-bold text-white">
              Edit Place
            </Text>
          </Pressable>

          {/* Delete */}
          <Pressable
            onPress={handleDelete}
            disabled={deleting}
            className="mt-3 rounded-2xl border border-[#D9A6A0] bg-[#FFF7F5] py-4"
          >
            <Text className="text-center text-base font-bold text-[#A85D54]">
              {deleting
                ? "Deleting..."
                : "Delete Place"}
            </Text>
          </Pressable>

          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            disabled={deleting}
            className="mt-3 items-center py-3"
          >
            <Text className="font-semibold text-[#8A806D]">
              Back to places
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}