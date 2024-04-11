import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserInformation from "../screens/UserInformation";
import { Stack } from "expo-router";

// const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       options={{ headerShown: false }}
    //       component={HomeScreen}
    //     />
    //     <Stack.Screen
    //       name="Welcome"
    //       options={{ headerShown: false }}
    //       component={WelcomeScreen}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       options={{ headerShown: false }}
    //       component={LoginScreen}
    //     />
    //     <Stack.Screen
    //       name="SignUp"
    //       options={{ headerShown: false }}
    //       component={SignUpScreen}
    //     />
    //     <Stack.Screen
    //       name="Userinfo"
    //       options={{ headerShown: false }}
    //       component={UserInformation}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
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
}
