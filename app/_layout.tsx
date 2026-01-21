import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
 
export default function RootLayout() {
  //ตั้งค่าการใช้งาน font kanit
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });
 
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
 
  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="bmi"
        options={{
          title: "BMI Calculator",
          headerStyle: { backgroundColor: "#ff8ae2" },
          headerTitleStyle: {
            color: "#ffffff",
            fontFamily: "Kanit_700Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}