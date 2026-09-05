import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type PlaceType = "coffee" | "food";

type Place = {
  id: number;
  type: PlaceType;
  name: string;
  location: string;
  rating: number;
  tags: string[];
};

const places: Place[] = [
  {
    id: 1,
    type: "coffee",
    name: "The Green Bean",
    location: "District 1 · Ho Chi Minh City",
    rating: 4.8,
    tags: ["Matcha", "Cozy"],
  },
  {
    id: 2,
    type: "food",
    name: "Little Hanoi",
    location: "District 3 · Ho Chi Minh City",
    rating: 4.9,
    tags: ["Vietnamese", "Favorite"],
  },
  {
    id: 3,
    type: "coffee",
    name: "Matcha Corner",
    location: "District 7 · Ho Chi Minh City",
    rating: 4.7,
    tags: ["Matcha", "Quiet"],
  },
];

export default function Places() {
  const [selectedType, setSelectedType] = useState<
    "all" | PlaceType
  >("all");

  const [search, setSearch] = useState("");

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesType =
        selectedType === "all" || place.type === selectedType;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        place.name.toLowerCase().includes(searchText) ||
        place.location.toLowerCase().includes(searchText) ||
        place.tags.some((tag) =>
          tag.toLowerCase().includes(searchText)
        );

      return matchesType && matchesSearch;
    });
  }, [selectedType, search]);

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Header */}
        <View className="px-6 pt-14">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="h-11 w-11 items-center justify-center rounded-full bg-[#E2E9D5]"
            >
              <Text className="text-2xl text-[#34402B]">‹</Text>
            </Pressable>

            <View className="ml-4">
              <Text className="text-2xl font-bold text-[#34402B]">
                My Places
              </Text>

              <Text className="mt-1 text-sm text-[#8A806D]">
                Your favorite little places.
              </Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View className="mt-7 px-6">
          <View className="flex-row items-center rounded-2xl border border-[#E3DDCD] bg-[#FFFDF7] px-5">
            <Text className="mr-3 text-lg">⌕</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search places..."
              placeholderTextColor="#A59C8A"
              className="flex-1 py-4 text-base text-[#34402B]"
            />
          </View>
        </View>

        {/* Filters */}
        <View className="mt-5 flex-row gap-2 px-6">
          <Pressable
            onPress={() => setSelectedType("all")}
            className={`rounded-full px-5 py-3 ${
              selectedType === "all"
                ? "bg-[#718355]"
                : "bg-[#FFFDF7]"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "all"
                  ? "text-white"
                  : "text-[#8A806D]"
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
                : "bg-[#FFFDF7]"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "coffee"
                  ? "text-white"
                  : "text-[#8A806D]"
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
                : "bg-[#FFFDF7]"
              }`}
          >
            <Text
              className={`font-semibold ${
                selectedType === "food"
                  ? "text-white"
                  : "text-[#8A806D]"
              }`}
            >
              🍜 Food
            </Text>
          </Pressable>
        </View>

        {/* Count */}
        <View className="mt-7 flex-row items-center justify-between px-6">
          <Text className="text-xl font-bold text-[#34402B]">
            {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1 ? "place" : "places"}
          </Text>

          <Text className="text-sm text-[#8A806D]">
            {selectedType === "all"
              ? "Everything"
              : selectedType === "coffee"
                ? "Coffee spots"
                : "Food places"}
          </Text>
        </View>

        {/* Place List */}
        <View className="mt-4 px-6">
          {filteredPlaces.map((place) => (
            <Pressable
              key={place.id}
              onPress={() => router.push("/place-detail")}
              className="mb-4 overflow-hidden rounded-3xl bg-[#FFFDF7]"
            >
              {/* Image placeholder */}
              <View
                className={`h-32 items-center justify-center ${
                  place.type === "coffee"
                    ? "bg-[#C9D6B5]"
                    : "bg-[#E5D8BF]"
                }`}
              >
                <View className="h-16 w-16 items-center justify-center rounded-full bg-[#F7F3E8]">
                  <Text className="text-3xl">
                    {place.type === "coffee" ? "☕" : "🍜"}
                  </Text>
                </View>
              </View>

              {/* Card content */}
              <View className="p-5">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-lg font-bold text-[#34402B]">
                      {place.name}
                    </Text>

                    <Text className="mt-1 text-sm text-[#8A806D]">
                      {place.location}
                    </Text>
                  </View>

                  <View className="rounded-full bg-[#F0E7D5] px-3 py-2">
                    <Text className="font-bold text-[#A58B52]">
                      ★ {place.rating}
                    </Text>
                  </View>
                </View>

                {/* Tags */}
                <View className="mt-4 flex-row flex-wrap gap-2">
                  {place.tags.map((tag) => (
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
              </View>
            </Pressable>
          ))}

          {/* Empty Search State */}
          {filteredPlaces.length === 0 && (
            <View className="items-center rounded-3xl bg-[#FFFDF7] px-6 py-12">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-[#DDE6D0]">
                <Text className="text-4xl">☕</Text>
              </View>

              <Text className="mt-5 text-xl font-bold text-[#34402B]">
                No places found
              </Text>

              <Text className="mt-2 text-center leading-5 text-[#8A806D]">
                Try another search or add a new favorite place.
              </Text>
            </View>
          )}
        </View>

        {/* Add Button */}
        <View className="mt-2 px-6">
          <Pressable
            onPress={() => router.push("/add-place")}
            className="flex-row items-center justify-center rounded-2xl bg-[#718355] py-4"
          >
            <Text className="text-lg font-bold text-white">
              + Add a place
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
