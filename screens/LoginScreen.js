import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react"; // Import useState for login state
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { Link, router } from "expo-router";

// Import Redux or your preferred state management library

export default function LoginScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  const handleLogin = () => {
    // Implement your login logic here (e.g., API call, authentication)
    // Assuming successful login, update the state
    setIsLoggedIn(true);

    // **Navigate to Home Screen using router.push if successful:**
    if (isLoggedIn) {
      router.push("/home"); // Assuming your Home Screen route is "/"
    }
  };

  return (
    <View
      className="flex-1 bg-gray-300"
      
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            value="john@gmail.com"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value="test12345"
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-red-300 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <Link href="/signup">
            <Text className="font-semibold text-red-300"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
