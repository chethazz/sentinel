import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
   <Stack>
    <Stack.Screen name="index" options={{headerTitle:"Welcome to Sentinal"}} />
    <Stack.Screen name="home"  options={{headerTitle:"Sentinal"}}/>
    <Stack.Screen name="login/index" options={{headerTitle:"Login page"}} />
    <Stack.Screen name="signup/index" options={{headerTitle:"Signup page"}} />
    <Stack.Screen name="contact/index" options={{headerTitle:"Contacts page "}} />
    <Stack.Screen name="CarCrash/index" options={{headerTitle:"Car Crash Detection page "}} />
    <Stack.Screen name="EarthquakeAlerts/index" options={{headerTitle:"Earthquak Alerts page "}} />
    <Stack.Screen name="NearbyHospitals/index" options={{headerTitle:"Nearby Hospitals page "}} />
    <Stack.Screen name="SafetyTips/index" options={{headerTitle:"Safety Tips page "}} />
    <Stack.Screen name="SafetyCheck/index" options={{headerTitle:"Safety Check page "}} />
    <Stack.Screen name="main/UserInfo/index" options={{headerTitle:"User Information page "}} />
    <Stack.Screen name="main/SOS/index" options={{headerTitle:"SOS page "}} />
   </Stack>
  );
};

export default RootLayout;
