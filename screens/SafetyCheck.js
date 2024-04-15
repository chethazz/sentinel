import React, { useState, useEffect } from "react";
import { sos_Api } from "../axios/axiosConfig";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

export default function SafetyCheck() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  // const initialRegion = useSelector((state) => state?.auth?.userLocation);

  // console.log('redux user locationnnnn',initialRegion);

  useEffect(() => {
    let interval;
    if (isRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

     
    }
    if(countdown === 1){
      const handleSOSRequest = async () => {
        try {
          const response = await sos_Api({
            allergies: "Peanuts, Shellfish",
            address: "123 Main St, City, Country",
            bloodType: "AB+",
          });
          console.log(response);
        } catch (error) {
          console.error("Error in SOS API:", error);
        }
      };

      handleSOSRequest();
    }

    return () => clearInterval(interval);
  }, [isRunning, countdown]);


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


  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  const handleStartStopPress = () => {
    if (isRunning) {
      // Stop the timer
      setIsRunning(false);
      setCountdown(0);
    } else {
      // Start the timer
      let totalHours = parseInt(hours);
      let totalMinutes = parseInt(minutes);

      // Validate total hours
      if (totalHours > 23) {
        // If total hours exceed 23, set it to 23
        totalHours = 23;
        setHours("23");
      }

      // Validate total minutes
      if (totalMinutes > 59) {
        // If total minutes exceed 59, set it to 59
        totalMinutes = 59;
        setMinutes("59");
      }

      // Calculate total seconds
      const total = totalHours * 3600 + totalMinutes * 60;

      setIsRunning(true);
      setCountdown(total);
    }
  };

  const renderCountdownText = () => {
    const remainingHours = Math.floor(countdown / 3600);
    const remainingMinutes = Math.floor((countdown % 3600) / 60);
    const remainingSeconds = countdown % 60;

    if (remainingHours > 0) {
      return `${formatTime(remainingHours)}:${formatTime(
        remainingMinutes
      )}:${formatTime(remainingSeconds)}`;
    } else if (remainingMinutes > 0) {
      return `${formatTime(remainingMinutes)}:${formatTime(remainingSeconds)}`;
    } else {
      return `${formatTime(remainingSeconds)} seconds`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Safety Check</Text>

      <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsCompass
      >
        {initialRegion && (
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>

      </View>


      <View style={styles.bottomContainer}>
        {isRunning && countdown > 0 ? (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{renderCountdownText()}</Text>
          </View>
        ) : (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>00:00:00</Text>
          </View>
        )}
        <View style={styles.timerInputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="HH"
            value={hours}
            onChangeText={(text) => setHours(text)}
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="MM"
            value={minutes}
            onChangeText={(text) => setMinutes(text)}
            maxLength={2}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleStartStopPress}
          disabled={!isRunning && (!hours || !minutes)}
        >
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  mapContainer:{
    flex: 1,
    height: "50%",
    width: "100%",
    marginTop:10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  map: {
    height: "91%",
  },
  timerInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("screen").width / 1.05,
  },
  bottomContainer: {
    alignContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 8,
    width: "45%",
    textAlign: "center",
    fontSize: 40,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FDA0A0",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    width: Dimensions.get("screen").width / 1.1,
  },
  buttonText: {
    fontSize: 20,

  },
  countdownContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 16,
    borderRadius: 20,
    width: Dimensions.get("screen").width / 1.1,
  },
  countdownText: {
    fontSize: 24,
    color: "black",
  },
});
