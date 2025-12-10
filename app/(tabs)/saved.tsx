import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SavedMovieCard from "@/components/SavedMovieCard";
import { ScrollView } from "react-native";
import { getUser } from "@/services/auth";
import { router, useRouter } from "expo-router";

const Saved = () => {
  const [user,setUser]= useState<any>()
  // const res = getUser().then((user: any) => setUser(user));
  const { data: movies, loading, error, refetch } = useFetch(getSavedMovies);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter()
  const onrefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefresh} />
        }
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <SavedMovieCard
              id={item.movie_id}
              poster_path={item.poster_path}
              release_date={item.release_date}
              title={item.title}
              vote_average={item.vote_average}
            />
          )}
          keyExtractor={(item) => item.movie_id.toString()}
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
                <Text className="text-gray-500 text-2xl font-bold mt-10">
                  Saved Movies For <Text className="text-white">You</Text>
                </Text>

                {error && (
                  <Text className="text-white ">Error:{error.message}</Text>
                )}
                {
                  movies?.length === 0 && (
                    <View className="flex justify-center items-center mt-32">

                    <Text className="text-gray-500 font-bold text-2xl">No Saved Movies</Text>
                    <Text className="text-accent font-bold underline" onPress={()=>router.replace('/(tabs)/search')}>Search</Text>
                    </View>
                  )
                }
              </View>
            </>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
