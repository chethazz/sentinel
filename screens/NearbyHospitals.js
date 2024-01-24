import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NearbyHospitals() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nearby Hospitals</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
