import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image, // Import Image component
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    title: "Car Crash Detection",
    routeName: "CarCrash",
    icon: require("../assets/icons/cc.png"),
  },
  {
    title: "Earthquake Alerts",
    routeName: "EarthquakeAlerts",
    icon: require("../assets/icons/eq.png"),
  },
  {
    title: "Safety Tips",
    routeName: "SafetyTips",
    icon: require("../assets/icons/st.png"),
  },
  {
    title: "Safety Check",
    routeName: "SafetyCheck",
    icon: require("../assets/icons/sc.png"),
  },
  {
    title: "Nearby Hospitals",
    routeName: "NearbyHospitals",
    icon: require("../assets/icons/nbh.png"),
  },
];

const MainItems = [
  {
    title: "Your Information",
    routeName: "Userinfo",
  },
  {
    title: "SOS",
    routeName: "SOS",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.branding}>Sentinel</Text>
      <View style={styles.featureContainer}>
        <View style={styles.listItems}>
          {DATA.map((item) => (
            <TouchableOpacity
              key={item.routeName}
              style={styles.buttonContainer}
              onPress={() => {}}
            >
              <View style={styles.featureButtons}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.featureTitles}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mainItems}>
          {MainItems.map((item) => (
            <TouchableOpacity
              key={item.routeName}
              style={styles.mainItemsContainer}
              onPress={() => {}}
            >
              <View style={styles.mainItemsButtons}>
                <Text style={styles.featureTitles}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  branding: {
    fontSize: 35,
    fontWeight: "800",
    marginHorizontal: 10,
  },
  mainItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  listItems: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  mainItemsContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  mainItemsButtons: {
    padding: 20,
    backgroundColor: "rgb(255, 138, 138)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignContent: "center",
    borderRadius: 20,
    aspectRatio: 1,
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureButtons: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: "rgb(225, 225, 225)",
    flexDirection: "row", // Add this line to align image and text horizontally
    alignItems: "center", // Add this line to align image and text vertically
  },
  featureTitles: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10, // Add margin to create space between icon and text
  },
  icon: {
    width: 26, // Adjust the width of the icon as needed
    height: 26, // Adjust the height of the icon as needed
  },
  featureContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 20,
  },
});
