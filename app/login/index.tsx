import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { getUser, login } from "@/services/auth";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

    const getLogin=async()=>{
      try {
        let user =await login();
        if(user){
          router.replace("/(tabs)");
        }
      } catch (error) {
        return (
          <Text className="text-white font-bold">Error In Login</Text>
        )
      }
    }
  return (
    <SafeAreaView className="bg-dark-200 flex-1">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      ></Image>
      <View className="flex justify-center items-center mt-20">
        <Image source={icons.logo} className="w-24 h-20 mt-8  mb-5 mx-auto" />
        <Text className="text-white mt-10 text-4xl font-bold">CineMatch</Text>
        <TouchableOpacity className="bg-accent rounded-full px-8 py-2 mt-10" onPress={()=>getLogin()}>
          <Text className="text-white text-lg font-semibold">Sign In With Google</Text>
        </TouchableOpacity>
        ;
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
