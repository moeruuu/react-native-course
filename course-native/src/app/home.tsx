import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { getPlaces, Place } from "../../lib/place";

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
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

  // Reload whenever Home becomes active
  useFocusEffect(
    useCallback(() => {
      loadPlaces();
    }, [])
  );

  // Statistics
  const coffeeCount = places.filter(
    (place) => place.type === "coffee"
  ).length;

  const foodCount = places.filter(
    (place) => place.type === "food"
  ).length;

  // Latest 2 places
  const recentPlaces = places.slice(0, 2);

  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <View className="px-6 pb-6 pt-16">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold tracking-widest text-[#718355]">
                MY LITTLE GUIDE
              </Text>

              <Text className="mt-2 text-3xl font-bold text-[#34402B]">
                Favorite Places
              </Text>
            </View>

            {/* Profile */}
            <Pressable
              onPress={() => router.push("/profile")}
              className="h-12 w-12 items-center justify-center rounded-full bg-[#DDE6D0]"
            >
              <Text className="text-xl">🌿</Text>
            </Pressable>
          </View>

          <Text className="mt-3 text-base text-[#8A806D]">
            Places worth coming back to.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3 px-6">
          {/* Coffee */}
          <View className="flex-1 rounded-3xl bg-[#DDE6D0] p-5">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F3E8]">
              <Text className="text-xl">☕</Text>
            </View>

            <Text className="mt-4 text-3xl font-bold text-[#34402B]">
              {coffeeCount}
            </Text>

            <Text className="mt-1 text-sm font-medium text-[#596747]">
              Coffee spots
            </Text>
          </View>

          {/* Food */}
          <View className="flex-1 rounded-3xl bg-[#E8DCC5] p-5">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F3E8]">
              <Text className="text-xl">🍜</Text>
            </View>

            <Text className="mt-4 text-3xl font-bold text-[#4F4637]">
              {foodCount}
            </Text>

            <Text className="mt-1 text-sm font-medium text-[#80735F]">
              Food places
            </Text>
          </View>
        </View>

        {/* Recent Favorites */}
        <View className="mt-9 px-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-[#34402B]">
              Recent favorites
            </Text>

            <Pressable
              onPress={() => router.push("/places")}
            >
              <Text className="font-semibold text-[#718355]">
                See all
              </Text>
            </Pressable>
          </View>

          {/* Loading */}
          {loading && (
            <View className="mt-6 items-center">
              <Text className="text-sm text-[#8A806D]">
                Loading your places...
              </Text>
            </View>
          )}

          {/* Empty state */}
          {!loading && recentPlaces.length === 0 && (
            <View className="mt-4 rounded-3xl bg-[#FFFDF7] p-6">
              <View className="items-center">
                <Text className="text-4xl">🌿</Text>

                <Text className="mt-3 text-lg font-bold text-[#34402B]">
                  No places yet
                </Text>

                <Text className="mt-1 text-center text-sm leading-5 text-[#8A806D]">
                  Start saving your favorite coffee
                  shops and food places.
                </Text>
              </View>
            </View>
          )}

          {/* Recent places */}
          {!loading &&
            recentPlaces.map((place) => (
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
                className="mt-4 overflow-hidden rounded-3xl bg-[#FFFDF7]"
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

        {/* Add Place */}
        <View className="mt-8 px-6">
          <Link href="/add-place" asChild>
            <Pressable className="flex-row items-center justify-center rounded-2xl bg-[#718355] py-4">
              <Text className="text-lg font-bold text-white">
                + Add a favorite place
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}