import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies, getMovieById } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { checkSavedMovie, deleteSaved, getSavedMovies, getTrendingMovies, saveMovie } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState<boolean>()
  const saveMovieFunc= async()=>{
    const user = await getUser();
    const user_id = user?.$id
    if(!isSaved){
      try {
        const res= await saveMovie(user_id!, id as string, `https://image.tmdb.org/t/p/w500${movie?.poster_path}}`, movie?.title!, movie?.vote_average!, movie?.release_date!);
        if(res){
          Alert.alert("Success", "Movie saved successfully!");
          setIsSaved(true)
        }
      } catch (error) {
        Alert.alert("Error", "Failed to save movie. Please try again.");
      }
    }
    else {
      Alert.alert("Already Saved!","Movie is already saved, do you want to remove?", [{text:'Cancel', style:'cancel'},{text:"Remove", onPress:async()=>{
        await deleteSaved(id as string)
        setIsSaved(false)
        Alert.alert("Success", "Movie removed successfully!");
      }}])
    }
   
  }
  useEffect(()=>{
   const func=async()=>{
      const isSaved = await checkSavedMovie(id as string);
      setIsSaved(isSaved)
    }
    func()
  },[isSaved])
  const { data: movie, loading } = useFetch(() => getMovieById(id as string));
  const router = useRouter();
  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-dark-100">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <ScrollView className="py-4">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}}`,
          }}
          className="w-full h-80"
          style={{ borderRadius: 20 }}
          resizeMode="center"
        ></Image>
        <View className="flex flex-col gap-2 mt-4 mx-4">
          <Text className="text-2xl text-white font-bold">{movie?.title}</Text>
          <TouchableOpacity className="absolute right-10 top-10 z-50" onPress={saveMovieFunc}>
            <View className=" bg-accent rounded-full h-auto w-auto p-2 justify-center items-center flex">
              <Image source={icons.save} className="size-6" tintColor="#fff" />
            </View>
            <Text className="text-white font-bold text-lg">{isSaved ? 'Saved!' : 'Save'}</Text>
          </TouchableOpacity>

          {/* <Text className="text-white font-bold text-lg">Save</Text> */}

          <View className="flex flex-row gap-3">
            <Text className="text-gray-500 font-bold">
              {movie?.release_date.split("-")[0]} -
            </Text>
            <Text className="text-gray-500 font-bold">
              {movie?.runtime} Minutes
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <Text className="text-gray-500 font-bold mt-2">Overview</Text>
          <Text className="text-white font-normal mt-2">{movie?.overview}</Text>
          <Text className="text-gray-500 font-bold mt-2">Genres</Text>
          <View className="flex-row gap-x-2 mt-2 flex-wrap">
            {movie?.genres.map((genre) => (
              <Text
                key={genre.id}
                className="text-white font-normal  px-2 py-1 rounded-md bg-[#8880d6]"
              >
                {genre.name}
              </Text>
            ))}
          </View>
          <Text className="text-gray-500 font-bold mt-2">Countries</Text>
          <View className="flex-row gap-x-2 mt-2 flex-wrap">
            {movie?.production_countries.map((country) => (
              <Text
                key={country.name}
                className="text-white border-solid border-2 px-2 border-[#8880d6] font-normal py-1 rounded-md"
              >
                {country.name}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            className="mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 mt-5"
            onPress={router.back}
          >
            <Image
              source={icons.arrow}
              className="size-5 mr-1 mt-0.5 rotate-180"
              tintColor="#fff"
            />
            <Text className="text-white font-semibold text-base">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
