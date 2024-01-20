import {
  FlatList,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    title: "Car Crash Detection",
    routeName: "CarCrash"
  },
  {
    title: "Earthquake Alerts",
    routeName: "EarthquakeAlerts"
  },
  {
    title: "Safety Tips",
    routeName: "SafetyTips"
  },
  {
    title: "Safety Check",
    routeName: "SafetyCheck"
  },
];

const MainItems = [
  {
    title: "Your Information",
    routeName: "userInfo"
  },
  {
    title: "SOS",
    routeName: "SOS"
  },
];

export default function HomeScreen() {
  const handleButtonPress = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.branding}>Sentinel</Text>
      <View style={styles.mainItems}>
        {MainItems.map((item) => (
          <TouchableOpacity
            key={item.routeName}
            style={styles.mainItemsContainer}
            onPress={() => handleButtonPress(item.title)}
          >
            <View style={styles.mainItemsButtons}>
              <Text style={styles.featureTitles}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.listItems}>
        {DATA.map((item) => (
          <TouchableOpacity
            key={item.routeName}
            style={styles.buttonContainer}
            onPress={() => handleButtonPress(item.routeName)}
          >
            <View style={styles.featureButtons}>
              <Text style={styles.featureTitles}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  branding: {
    fontSize: 35,
    fontWeight: "800",
    marginHorizontal: 10,
  },
  mainItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  listItems: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  mainItemsContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  mainItemsButtons: {
    width: Dimensions.get("window").width/2.3,
    height: Dimensions.get("window").width/2.3,
    backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignContent: "center",
    borderRadius: 20,
  },
  item: {
    padding: 30,
    backgroundColor: "gray",
    margin: 10,
    borderRadius: 15,
    width: Dimensions.get("window").width,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height / 10,
  },
  featureButtons: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: "skyblue",
  },
  featureTitles: {
    fontSize: 16,
    fontWeight: "700",
  },
});
