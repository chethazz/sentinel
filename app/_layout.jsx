import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
   <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }}/>
    <Stack.Screen name="home"  options={{ headerShown: false }}/>
    <Stack.Screen name="login/index" options={{ headerShown: false }} />
    <Stack.Screen name="signup/index" options={{ headerShown: false }} />
    <Stack.Screen name="contact/index" options={{ headerShown: false }} />
    <Stack.Screen name="CarCrash/index" options={{ headerShown: false }} />
    <Stack.Screen name="EarthquakeAlerts/index" options={{ headerShown: false }} />
    <Stack.Screen name="NearbyHospitals/index" options={{ headerShown: false }} />
    <Stack.Screen name="SafetyTips/index" options={{ headerShown: false }} />
    <Stack.Screen name="SafetyCheck/index" options={{ headerShown: false }} />
    <Stack.Screen name="main/UserInfo/index" options={{ headerShown: false }} />
    <Stack.Screen name="main/SOS/index" options={{ headerShown: false }} />
   </Stack>
  );
};

export default RootLayout;
