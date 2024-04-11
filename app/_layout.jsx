import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import AppNavigation from "../navigation/appNavigation";
import store from "../redux/store";
import { Provider } from "react-redux";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default RootLayout;
