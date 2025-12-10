import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [refreshing,setRefreshing]= useState(false)
  const {data: trendingMovies, loading: trendingLoading, error: trendingError,refetch} = useFetch(getTrendingMovies)
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: ""}));

  const onrefresh=()=>{
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className="flex-1 bg-primary px-2">
      <Image source={images.bg} className="absolute w-full z-0" />
      
      <ScrollView
        className="flex-1 px-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onrefresh}/>}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-8  mb-5 mx-auto" />
        {loading || trendingLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      ) : error || trendingError ? (
        <Text className="text-white ">Error:{error?.message || trendingError?.message}</Text>
      ) : (
        <View className="flex-1 mt-5">
          <SearchBar
            placeholder="Search for a movie"
            onPress={() => {
              router.push("/search");
            }}
          />
        {
          trendingMovies && (
            <View className="mt-10">
              <Text className="text-lg text-white font-bold">Trending Movies <Text className="text-gray-500">(Based on user search)</Text></Text>
              <FlatList data={trendingMovies} renderItem={({item,index})=>(
            <TrendingCard movie={item} index={index}/>
          )} keyExtractor={(item)=>item.movie_id.toString()}   scrollEnabled={true} horizontal={true} contentContainerStyle={{gap:20}} className="mt-5 pr-5">

          </FlatList>
            </View>
          )
        }
          <>
          <Text className="flex-1 text-white font-bold mt-5 mb-3">Latest Movies</Text>
          </>
          <FlatList data={movies} renderItem={({item})=>(
            <MovieCard {...item}/>
          )} numColumns={3} keyExtractor={(item)=>item.id.toString()} columnWrapperStyle={{justifyContent:'center',gap:16, marginVertical:16}}  scrollEnabled={false}>

          </FlatList>
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}
