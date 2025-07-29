import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  const isLoading = trendingLoading || moviesLoading;
  const isError = trendingError || moviesError;

  useEffect(() => {
    console.log("Trending Movies:", trendingMovies);
    console.log("Latest Movies:", movies);
  }, [trendingMovies, movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#AB8BFF"
            className="mt-10 self-center"
          />
        ) : isError ? (
          <Text className="text-red-500 text-center mt-5">
            Error: {trendingError?.message || moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {/* Trending Movies Section */}
            <Text className="text-lg text-white font-bold mt-10 mb-3">
              Trending Movies
            </Text>

            {Array.isArray(trendingMovies) && trendingMovies.length > 0 ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4 mt-3"
                data={trendingMovies}
                contentContainerStyle={{ gap: 26 }}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item, index) =>
                  item.movie_id?.toString() || index.toString()
                }
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            ) : (
              <Text className="text-gray-400 text-sm italic">
                No trending movies available
              </Text>
            )}

            {/* Latest Movies Section */}
            <Text className="text-lg text-white font-bold mt-8 mb-3">
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              contentContainerStyle={{
                marginTop: 8,
                paddingBottom: 128,
              }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
