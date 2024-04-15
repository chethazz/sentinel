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
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
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

  const fetchNearbyPlaces = async (type) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${initialRegion.latitude},${initialRegion.longitude}&radius=5000&type=${type}&key=AIzaSyABJzaTuyRnUzPSC70zTeeBegzO3LA2wBA`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // setNearbyHospitals(data.results);
        console.log(`Nearby ${type}s data:`, data?.results);
        setNearbyPlaces(data.results);
      }
    } catch (error) {
      console.error(`Error fetching nearby ${type}s:`, error);
    }
  };

  const handleNearbyPlaceMarkerPress = async (nearByPlace) => {
    setSelectedPlace(nearByPlace);
    console.log("selected nearByPlacelllllllll;l", selectedPlace);
    // Clear existing directions (if any)
    setDirections(null);
    // Call function to fetch directions for the selected nearByPlace
    fetchDirections(nearByPlace);
  };

  const fetchDirections = async (selectedPlace) => {
    try {
      console.log("fetch directionsss sssssss", selectedPlace);
      const destLat = selectedPlace?.geometry?.location?.lat;
      const destLng = selectedPlace?.geometry?.location?.lng;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destLat},${destLng}&key=AIzaSyABJzaTuyRnUzPSC70zTeeBegzO3LA2wBA` // Replace with your Google Maps API key
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        console.log("directionssss*****", data.routes[0].legs[0]);
        setDirections(data.routes[0].legs[0]);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        {/* Display nearby hospital or police station  */}
        {nearbyPlaces.map((nearbyPlace, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: nearbyPlace.geometry.location.lat,
              longitude: nearbyPlace.geometry.location.lng,
            }}
            title={nearbyPlace.name}
            description={nearbyPlace.vicinity}
            pinColor="red"
            onPress={() => handleNearbyPlaceMarkerPress(nearbyPlace)}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchNearbyPlaces("hospital")}
        >
          <Text style={styles.buttonText}>Hospitals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchNearbyPlaces("police")}
        >
          <Text style={styles.buttonText}>PoliceStations</Text>
        </TouchableOpacity>
      </View>

      {selectedPlace && directions && (
        <View style={styles.directionsContainer}>
          <Text>To: {selectedPlace.name}</Text>
          <Text>Distance: {directions.distance.text}</Text>
          <Text>Duration: {directions.duration.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  map: {
    height: "91%",
    // marginHorizontal: 20,
    // borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "rgb(255, 150, 150)",
    width: "45%",
    display: "flex",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  directionsContainer: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default NearbyHospitals;
