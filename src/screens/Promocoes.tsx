import { FlatList, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { fetchPromotions } from "@services/get";

import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@ui/Text";
import { Header } from "@layout/Header";
import { Product } from "@models/index";
import { useCallback } from "react";
import { PromotionItemList } from "@layout/PromotionItemList";
import { Loading } from "@layout/Loading";

export function Promocoes() {
  const { data: promotions, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchPromotions,
  });

  const renderPromotion = useCallback(
    ({ item }: { item: Product }) => (
      <PromotionItemList product={item} key={item.id} />
    ),
    [],
  );

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <View className="px-6 py-4">
        <Text className="text-2xl font-semibold">Promoções</Text>
      </View>

      {!isLoadingPromotions ? (
        <FlatList
          className="mb-4"
          data={promotions}
          renderItem={renderPromotion}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            flexGrow: 1,
            justifyContent: "space-around",
            columnGap: 20,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 30,
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}
        />
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
}
