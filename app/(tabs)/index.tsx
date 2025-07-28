import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
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

  // Debug log
  useEffect(() => {
    console.log("Trending Movies: ", trendingMovies);
    console.log("Latest Movies: ", movies);
  }, [trendingMovies, movies]);

  const isLoading = trendingLoading || moviesLoading;
  const isError = trendingError || moviesError;

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
            {trendingMovies?.length > 0 ? (
              trendingMovies.map((item) => (
                <Text
                  key={item.movie_id || item.id}
                  className="text-white text-sm mb-1"
                >
                  {item.title}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400 text-sm">No trending movies found.</Text>
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
