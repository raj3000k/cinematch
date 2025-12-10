import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { logout } from "@/services/auth";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] rounded-full justify-center items-center overflow-hidden mt-4 min-h-16"
      >
        <Image source={icon} tintColor={"#151312"} className="size-5" />
        <Text className="text-secondary text-base ml-2 font-semibold">{title}</Text>
      </ImageBackground>
    );
  }

    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  
};

const _layout = () => {
const router = useRouter()

  const getLogout=async()=>{
    try {
      let res =await logout();
      if(res){
        router.replace("/login");
      }
    } catch (error) {
      return (
        <Text className="text-white font-bold">Error In Logout</Text>
      )
    }
  }
  return (
    <>
     <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
         
          
        },
        tabBarStyle:{
          backgroundColor:'#0f0d23',
          borderRadius: 50,
          marginHorizontal:20,
          marginBottom:36,
          height:52,
          position:'absolute',
          overflow:'hidden',
          borderColor:'#0f0d23',
          borderWidth:1,
          
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Saved" icon={icons.save} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      /> */}
    </Tabs>
    <TouchableOpacity className="absolute top-20 right-8 " onPress={getLogout}>
      <Text className="text-red-600 font-bold">Logout</Text>
    </TouchableOpacity>
    </>
   
  );
};

export default _layout;

const styles = StyleSheet.create({});
