import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TrendingCard = ({movie,index}:{movie:TrendingMovie, index: number}) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
        <TouchableOpacity className='w-32 relative pl-5 ml-5'>
            <Image source={{uri: movie.poster_uri}} className='w-32 h-48 rounded-lg' resizeMode='cover'/>
            <Text className='text-[60px] text-white absolute bottom-4 -left-3'>{index+1}</Text>
            <Text className="text-sm text-center font-bold text-white mt-2" numberOfLines={1}>{movie.title}</Text>
            
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})