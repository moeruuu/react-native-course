import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { getPlaces, Place } from "../../lib/place";

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedType, setSelectedType] = useState<
    "all" | "coffee" | "food"
  >("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPlaces = async () => {
    try {
      setLoading(true);

      const data = await getPlaces();

      setPlaces(data);
    } catch (error) {
      console.error("Load places error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reload every time this screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadPlaces();
    }, [])
  );

  const filteredPlaces = places.filter((place) => {
    const matchesType =
      selectedType === "all" ||
      place.type === selectedType;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      place.name.toLowerCase().includes(searchText) ||
      place.location.toLowerCase().includes(searchText) ||
      place.notes.toLowerCase().includes(searchText) ||
      place.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

    return matchesType && matchesSearch;
  });

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <View className="px-6 pb-5 pt-16">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
            >
              <Text className="text-2xl text-[#34402B]">
                ‹
              </Text>
            </Pressable>

            <View className="ml-4">
              <Text className="text-2xl font-bold text-[#34402B]">
                My places
              </Text>

              <Text className="mt-1 text-sm text-[#8A806D]">
                All your favorite spots.
              </Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View className="px-6">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search places..."
            placeholderTextColor="#A59C8A"
            className="rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5 py-4 text-base text-[#34402B]"
          />
        </View>

        {/* Filter */}
        <View className="mt-5 flex-row gap-3 px-6">
          <Pressable
            onPress={() => setSelectedType("all")}
            className={`rounded-full px-5 py-3 ${
              selectedType === "all"
                ? "bg-[#718355]"
                : "bg-[#E2E9D5]"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "all"
                  ? "text-white"
                  : "text-[#596747]"
              }`}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedType("coffee")}
            className={`rounded-full px-5 py-3 ${
              selectedType === "coffee"
                ? "bg-[#718355]"
                : "bg-[#E2E9D5]"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "coffee"
                  ? "text-white"
                  : "text-[#596747]"
              }`}
            >
              ☕ Coffee
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedType("food")}
            className={`rounded-full px-5 py-3 ${
              selectedType === "food"
                ? "bg-[#718355]"
                : "bg-[#E2E9D5]"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "food"
                  ? "text-white"
                  : "text-[#596747]"
              }`}
            >
              🍜 Food
            </Text>
          </Pressable>
        </View>

        {/* Count */}
        <View className="mt-7 px-6">
          <Text className="text-sm font-semibold text-[#8A806D]">
            {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1
              ? "place"
              : "places"}
          </Text>
        </View>

        {/* Loading */}
        {loading && (
          <View className="mt-8 items-center px-6">
            <Text className="text-sm text-[#8A806D]">
              Loading your places...
            </Text>
          </View>
        )}

        {/* Empty */}
        {!loading && filteredPlaces.length === 0 && (
          <View className="mx-6 mt-5 rounded-3xl bg-[#FFFDF7] p-7">
            <View className="items-center">
              <Text className="text-4xl">🌿</Text>

              <Text className="mt-3 text-xl font-bold text-[#34402B]">
                No places found
              </Text>

              <Text className="mt-2 text-center text-sm leading-5 text-[#8A806D]">
                {search.trim()
                  ? "Try searching with another name or location."
                  : "Start saving your favorite places."}
              </Text>

              {!search.trim() && (
                <Pressable
                  onPress={() => router.push("/add-place")}
                  className="mt-5 rounded-2xl bg-[#718355] px-6 py-4"
                >
                  <Text className="font-bold text-white">
                    Add a place
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* Places */}
        {!loading && filteredPlaces.length > 0 && (
          <View className="mt-4 px-6">
            {filteredPlaces.map((place) => (
              <Pressable
                key={place._id}
                onPress={() =>
                  router.push({
                    pathname: "/place-detail",
                    params: {
                      id: place._id,
                    },
                  })
                }
                className="mb-4 overflow-hidden rounded-3xl bg-[#FFFDF7]"
              >
                {/* Image placeholder */}
                <View
                  className={`h-40 items-center justify-center ${
                    place.type === "coffee"
                      ? "bg-[#C9D6B5]"
                      : "bg-[#E5D8BF]"
                  }`}
                >
                  <Text className="text-6xl">
                    {place.type === "coffee"
                      ? "☕"
                      : "🍜"}
                  </Text>
                </View>

                {/* Content */}
                <View className="p-5">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-xl font-bold text-[#34402B]">
                        {place.name}
                      </Text>

                      <Text className="mt-1 text-sm text-[#8A806D]">
                        {place.location}
                      </Text>
                    </View>

                    <View className="flex-row items-center rounded-full bg-[#F0E7D5] px-3 py-2">
                      <Text className="text-sm font-bold text-[#A58B52]">
                        ★ {place.rating}
                      </Text>
                    </View>
                  </View>

                  {/* Notes */}
                  {place.notes && (
                    <Text
                      numberOfLines={2}
                      className="mt-4 leading-5 text-[#665E50]"
                    >
                      {place.notes}
                    </Text>
                  )}

                  {/* Tags */}
                  {place.tags &&
                    place.tags.length > 0 && (
                      <View className="mt-4 flex-row flex-wrap gap-2">
                        {place.tags
                          .slice(0, 3)
                          .map((tag) => (
                            <View
                              key={tag}
                              className="rounded-full bg-[#E2E9D5] px-3 py-2"
                            >
                              <Text className="text-xs font-semibold text-[#596747]">
                                {tag}
                              </Text>
                            </View>
                          ))}
                      </View>
                    )}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {/* Add Place */}
        <View className="mt-4 px-6">
          <Pressable
            onPress={() => router.push("/add-place")}
            className="flex-row items-center justify-center rounded-2xl bg-[#718355] py-4"
          >
            <Text className="text-lg font-bold text-white">
              + Add a favorite place
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}