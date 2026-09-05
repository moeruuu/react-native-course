import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function PlaceDetail() {
  // Temporary data.
  // Later, this will come from the backend/database.
  const place = {
    type: "coffee",
    name: "The Green Bean",
    location: "District 1 · Ho Chi Minh City",
    rating: 4.8,
    notes:
      "A cozy place with really good matcha and a quiet atmosphere.",
    tags: ["Matcha", "Cozy"],
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
            Place details
          </Text>
        </View>

        {/* Hero */}
        <View className="mx-6 mt-7 overflow-hidden rounded-3xl bg-[#FFFDF7]">
          <View className="h-56 items-center justify-center bg-[#C9D6B5]">
            <View className="h-28 w-28 items-center justify-center rounded-full bg-[#F7F3E8]">
              <Text className="text-6xl">☕</Text>
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
                  ☕ {place.type}
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
              {place.notes}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View className="mt-7 px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            Tags
          </Text>

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
          <Pressable
            onPress={() => router.push("/add-place")}
            className="rounded-2xl bg-[#718355] py-4"
          >
            <Text className="text-center text-base font-bold text-white">
              Edit Place
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
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

