import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { register } from "../axios/axiosConfig";
import { Link, router } from "expo-router";

    
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async() =>{
    setFullNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!username.trim()) {
      setFullNameError("Full Name is required");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }
     if (isValid) {
      try {
        const response = await register(username, email, password);
        console.log('Registration successful:', response);
        alert("Success", "Registration successful");
        router.push("/login")
      } catch (error) {
        console.error('Error registering user:', error);
        alert("Error", "Failed to register user. Please try again.");
      }
    
    }
  } 
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <View
      className="flex-1 bg-gray-300"
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            onChangeText={text => setFullName(text)}
            placeholder="Enter Name"
          />
          <Text style={{ color: 'red', marginBottom: 10 }}>{fullNameError}</Text>
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            placeholder="Enter Email"
            onChangeText={text => setEmail(text)}
          />
          <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text>
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            placeholder="Enter Password"
          />
          <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text>
          <TouchableOpacity className="py-3 bg-red-300 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-700" onPress={handleSignup}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-red-300"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
