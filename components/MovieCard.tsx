import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Dimensions } from "react-native";
import { icons } from "@/constants/icons";
const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const { width } = Dimensions.get("window");
  const cardWidth = (width-60)/3
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{width:cardWidth}}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className=" rounded-lg"
          resizeMode="cover"
          style={{width:"100%", height: 180, borderRadius: 10}}
          
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4"></Image>
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(vote_average/2)}
            </Text>
            
        </View>
        <Text className="text-xs text-light-300 font-medium mt-1">{release_date.split('-')[0]}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
