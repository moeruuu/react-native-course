import { Link, router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-[#F7F3E8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
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
              8
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
              12
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

            <Pressable onPress={() => router.push("/places")}>
                <Text className="font-semibold text-[#718355]">
                    See all
                </Text>
            </Pressable>
          </View>

          {/* Coffee Place */}
          <Pressable
            onPress={() => router.push("/place-detail")}
            className="mt-4 overflow-hidden rounded-3xl bg-[#FFFDF7]"
            >
            {/* Image placeholder */}
            <View className="h-40 items-center justify-center bg-[#C9D6B5]">
              <Text className="text-6xl">☕</Text>
            </View>

            <View className="p-5">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-[#34402B]">
                    The Green Bean
                  </Text>

                  <Text className="mt-1 text-sm text-[#8A806D]">
                    District 1 · Ho Chi Minh City
                  </Text>
                </View>

                <View className="flex-row items-center rounded-full bg-[#F0E7D5] px-3 py-2">
                  <Text className="text-sm font-bold text-[#A58B52]">
                    ★ 4.8
                  </Text>
                </View>
              </View>

              <Text className="mt-4 leading-5 text-[#665E50]">
                A cozy place with really good matcha and a
                quiet atmosphere.
              </Text>

              <View className="mt-4 flex-row gap-2">
                <View className="rounded-full bg-[#E2E9D5] px-3 py-2">
                  <Text className="text-xs font-semibold text-[#596747]">
                    Matcha
                  </Text>
                </View>

                <View className="rounded-full bg-[#E2E9D5] px-3 py-2">
                  <Text className="text-xs font-semibold text-[#596747]">
                    Cozy
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Food Place */}
          <View className="mt-4 overflow-hidden rounded-3xl bg-[#FFFDF7]">
            {/* Image placeholder */}
            <View className="h-40 items-center justify-center bg-[#E5D8BF]">
              <Text className="text-6xl">🍜</Text>
            </View>

            <View className="p-5">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-[#34402B]">
                    Little Hanoi
                  </Text>

                  <Text className="mt-1 text-sm text-[#8A806D]">
                    District 3 · Ho Chi Minh City
                  </Text>
                </View>

                <View className="flex-row items-center rounded-full bg-[#F0E7D5] px-3 py-2">
                  <Text className="text-sm font-bold text-[#A58B52]">
                    ★ 4.9
                  </Text>
                </View>
              </View>

              <Text className="mt-4 leading-5 text-[#665E50]">
                Great Vietnamese food with a warm and relaxed
                atmosphere.
              </Text>

              <View className="mt-4 flex-row gap-2">
                <View className="rounded-full bg-[#E2E9D5] px-3 py-2">
                  <Text className="text-xs font-semibold text-[#596747]">
                    Vietnamese
                  </Text>
                </View>

                <View className="rounded-full bg-[#E2E9D5] px-3 py-2">
                  <Text className="text-xs font-semibold text-[#596747]">
                    Favorite
                  </Text>
                </View>
              </View>
            </View>
          </View>
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