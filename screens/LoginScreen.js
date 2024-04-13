import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useDispatch } from "react-redux";
import { Link, router } from "expo-router";
import { login } from "../axios/axiosConfig";
import { setLogin } from "../redux/reducers/auth.slice";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await login(email, password);
      console.log(response);
      dispatch(
        setLogin({
          user: response.users,
          isLoggedIn: true,
          userLocation: {
            longitude: 0,
            latitude: 0,
          },
        })
      );
      router.push("/home");
    } catch (error) {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-gray-300">
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
            onChangeText={(text) => setEmail(text)}
          />
          {emailError ? (
            <Text style={{ color: "red", marginLeft: 10 }}>{emailError}</Text>
          ) : null}
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
          />
          {passwordError ? (
            <Text style={{ color: "red", marginLeft: 10 }}>
              {passwordError}
            </Text>
          ) : null}
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
