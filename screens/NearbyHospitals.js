// import React from "react";
// import { StyleSheet, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function NearbyHospitals() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Nearby Hospitals</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: "bold",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NearbyHospitals = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const fetchNearbyHospitals = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=<span class="math-inline">\{initialRegion\.latitude\},</span>{initialRegion.longitude}&radius=5000&type=hospital&key=AIzaSyBw2s3FNzQUe7DbgHf2CiV0xOsIYquEKQg
        ` // Replace with your Google Maps API key
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setNearbyHospitals(data.results);
      }
      console.log("responsee of fetch google map ", response);
    } catch (error) {
      console.error("Error fetching nearby hospitals:", error);
    }
  };

  const handleHospitalMarkerPress = async (hospital) => {
    setSelectedHospital(hospital);
    // Clear existing directions (if any)
    setDirections(null);
    // Call function to fetch directions for the selected hospital
    fetchDirections(hospital);
  };

  const fetchDirections = async (hospital) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=<span class="math-inline">\{currentLocation\.latitude\},</span>{currentLocation.longitude}&destination=<span class="math-inline">\{hospital\.geometry\.location\.lat\},</span>{hospital.geometry.location.lng}&key=AIzaSyBw2s3FNzQUe7DbgHf2CiV0xOsIYquEKQg` // Replace with your Google Maps API key
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        setDirections(data.routes[0].legs[0]);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          showsCompass
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}

          {/* Display nearby hospitals */}
          {nearbyHospitals.map((hospital, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title={hospital.name}
              description={hospital.vicinity}
              pinColor="red"
              onPress={() => handleHospitalMarkerPress(hospital)}
            />
          ))}
        </MapView>

        <TouchableOpacity style={styles.button} onPress={fetchNearbyHospitals}>
          <Text style={styles.buttonText}>Find Nearby Hospitals</Text>
        </TouchableOpacity>

        {selectedHospital && directions && (
          <View style={styles.directionsContainer}>
            <Text>To: {selectedHospital.name}</Text>
            <Text>Distance: {directions.distance.text}</Text>
            <Text>Duration: {directions.duration.text}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  directionsContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default NearbyHospitals;
