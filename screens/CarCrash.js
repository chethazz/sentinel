import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.head}>Try a demo</Text>
        <Text style={styles.information}>See what happens when your phone detects a car crash</Text>
      </View>
      <View style={styles.phoneContainer}>
        <ImageBackground source={require('../assets/images/pixel8.png')} style={styles.pixel8}>
            <TouchableOpacity style={styles.touchableOpacity}>
                
                    <Text style={styles.button}>Start</Text>
                
            </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
    },
    head: {
        fontSize: 35,
        marginVertical: 10,
    },
    information: {
        fontSize: 16,
        marginVertical: 10,
    },
    phoneContainer: {
        marginTop: Dimensions.get("window").height/15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    pixel8: {
        height: 620,
        width: 300,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    touchableOpacity: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 15,
        width: '30%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
    }
  });