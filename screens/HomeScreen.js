import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { sos_Api } from "../axios/axiosConfig";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Link, router, useFocusEffect } from "expo-router"; // Ensure to import useFocusEffect
import { Accelerometer } from "expo-sensors";
import CarCrash from "./CarCrash";
import { useSelector } from "react-redux";

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
    title: "Hospitals & Police Stations",
    routeName: "NearbyHospitals",
    icon: require("../assets/icons/nbh.png"),
  },
];

// const MainItems = [
//   {
//     title: "Your Information",
//     routeName: "UserInfo",
//   },
//   {
//     title: "SOS",
//     routeName: "SOS",
//   },
// ];

export default function HomeScreen() {
  const [carCrashDetected, setCarCrashDetected] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  const handleSOSRequest = async () => {
    try {
      const response = await sos_Api({
        allergies: userData.allergies,
        address: userData.address,
        bloodType: userData.bloodType,
      });
      console.log(response);
    } catch (error) {
      console.error("Error in SOS API:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const tiltThreshold = 2;
      const detectionDuration = 6000;

      let detectionTimeout;

      const subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        if (
          !carCrashDetected &&
          (x < -tiltThreshold ||
            x > tiltThreshold ||
            y < -tiltThreshold ||
            y > tiltThreshold ||
            z < -tiltThreshold ||
            z > tiltThreshold)
        ) {
          setCarCrashDetected(true);
          router.push("CarCrash");
          detectionTimeout = setTimeout(() => {
            setCarCrashDetected(false);
          }, detectionDuration);
        }
      });

      return () => {
        subscription.remove();
        clearTimeout(detectionTimeout);
      };
    }, [carCrashDetected])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.branding}>Sentinel</Text>
        <TouchableOpacity key="contact" onPress={() => router.push("contact")}>
          <Image
            source={require("../assets/icons/ec.png")}
            style={styles.contacts}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.featureContainer}>
        <View style={styles.listItems}>
          {DATA.map((item) => (
            <TouchableOpacity
              key={item.routeName}
              style={styles.buttonContainer}
              onPress={() => router.push(item?.routeName)}
            >
              <View style={styles.featureButtons}>
                <View style={styles.iconContainer}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <Text style={styles.featureTitles}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mainItems}>
          <TouchableOpacity
            key={"UserInfo"}
            style={styles.mainItemsContainer}
            onPress={() => router.push(`main/UserInfo`)}
          >
            <View style={styles.mainItemsButtons}>
              <Text style={styles.featureTitles}>Your Information</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            key={"SOS"}
            style={styles.mainItemsContainer}
            onPress={handleSOSRequest}
          >
            <View style={styles.mainItemsButtons}>
              <Text style={styles.featureTitles}>SOS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 20,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contacts: {
    height: 34,
    width: 34,
  },
  branding: {
    fontSize: 35,
    fontWeight: "800",
  },
  mainItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  listItems: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  mainItemsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  mainItemsButtons: {
    backgroundColor: "rgb(255, 150, 150)",
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
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: "rgb(235, 235, 235)",
    flexDirection: "row",
    alignItems: "center",
  },
  featureTitles: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 3,
    borderRadius: 6,
    marginRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  featureContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 20,
  },
});
