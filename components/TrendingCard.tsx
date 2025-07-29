import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type TrendingCardProps = {
  movie: {
    movie_id: string;
    title: string;
    poster_url: string;
  };
  index: number;
};

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        {/* Movie Poster */}
        <Image
          source={{
            uri: poster_url || "https://via.placeholder.com/120x180",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        {/* Ranking Badge with Gradient */}
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        {/* Movie Title (Optional) */}
        <Text
          className="text-white text-xs font-semibold mt-2 ml-1"
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
