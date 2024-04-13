import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScaledSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const eqSample = [
  {
    httpStatus: 200,
    noun: "latestEarthquakeNearMe",
    verb: "GET",
    errorCode: "none",
    errors: [],
    friendlyError: "",
    result: "success",
    count: 1,
    data: [
      {
        title: "M 0.7 - 12km NNE of Banning, CA",
        date: "Sun, 4/17/22, 6:00 am UTC",
        url: "https://earthquake.usgs.gov/earthquakes/eventpage/ci40238760",
      },
      {
        title: "M 0.7 - 10km NNE of Banning, LA",
        date: "Sun, 4/17/22, 5:00 am UTC",
        url: "https://chethas.vercel.app",
      },
    ],
  },
];

export default function Earthquake() {
  const earthquakes = eqSample[0]?.data || []; // Access earthquake data

  if (!earthquakes.length) {
    return (
      <SafeAreaView style={styles.spacing}>
        <Text style={styles.title}>Earthquake Alerts</Text>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/earthquake_1.png")}
            style={styles.earthquakeImage}
          />
        </View>
        <Text>No recent earthquakes available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.spacing}>
      <Text style={styles.title}>Earthquake Alerts</Text>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/earthquake_1.png")}
          style={styles.earthquakeImage}
        />
      </View>
      {earthquakes.map((earthquake) => (
        <View style={styles.eqContainer}>
          <Text style={styles.eqTitle}>{earthquake.title}</Text>
          <Text styles={styles.eqDate}>{earthquake.date}</Text>
          <TouchableOpacity
            style={styles.moreInfoButton}
            key={earthquake.title}
            onPress={() => Linking.openURL(earthquake.url)}
          >
            <Text>More info</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacing: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  earthquakeImage: {
    width: Dimensions.get("screen").width / 1.1,
    height: Dimensions.get("screen").width / 1.1,
    resizeMode: "contain",
    // backgroundColor: 'black'
    borderRadius: 20,
    marginBottom: 10,
  },
  eqContainer: {
    backgroundColor: "#D6D6D6",
    borderRadius: 20,
    padding: 20,
    marginVertical: 5,
  },
  eqTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  moreInfoButton: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
    backgroundColor: "white",
  },
});
