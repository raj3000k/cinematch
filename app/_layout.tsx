import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import "./globals.css";
import { getUser, getSession } from "@/services/auth";

export default function RootLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser();
        const session = await getSession();

        if (user && session) {
          router.replace("/(tabs)");
          setChecking(false)

        } else {
          router.replace("/login");
          setChecking(false)

        }
      } catch (err) {
        console.error("Error checking session:", err);
        router.replace("/login");
      } finally {
        setChecking(false); // even if navigation happens, just to avoid rendering below
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
