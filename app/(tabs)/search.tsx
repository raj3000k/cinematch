import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies=[],
    loading,
    refetch: loadMovies,
    reset,
    error,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  useEffect(() => {
    setTimeout(() => {
      if (movies?.length > 0 && searchTerm !== '') {
        updateSearchCount(searchTerm,movies[0])
      }
    }, 500);
    
  }, [movies]);
  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <>
            <View>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-8  mb-5 mx-auto"
              />
              {loading && (
                <ActivityIndicator
                  size={"large"}
                  color={"#0000ff"}
                  className="mt-10 self-center"
                />
              )}
              {error && (
                <Text className="text-white ">Error:{error.message}</Text>
              )}

              <SearchBar
                placeholder="Search for a movie"
                value={searchTerm}
                onChangeText={handleSearch}
              />
              {!loading && !error && searchTerm.trim() && movies.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchTerm}</Text>
                </Text>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                No results for "{searchTerm}"
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
