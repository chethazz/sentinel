import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Link, router } from "expo-router";

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
    routeName: "UserInfo",
  },
  {
    title: "SOS",
    routeName: "SOS",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.branding}>Sentinel</Text>
        <Link href="contact">
        <Image
          source={require("../assets/icons/ec.png")}
          style={styles.contacts}
        />
        </Link>
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
          {MainItems.map((item) => (
            <TouchableOpacity
              key={item.routeName}
              style={styles.mainItemsContainer}
              onPress={() => router.push(`main/${item?.routeName}`)}
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
  },
  header: {
    marginHorizontal:10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop:0,
  },
  listItems: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  mainItemsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  mainItemsButtons: {
    backgroundColor: "#FCD5CE",
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
    marginBottom: 10,
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
