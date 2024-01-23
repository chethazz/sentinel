import React from 'react'
import { Dimensions, Image, StyleSheet, ScaledSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Earthquake() {
  return (
    <SafeAreaView style={styles.spacing}> 
      <Text style={styles.title}>Earthquake Alerts</Text>
        <View style={styles.container}>
          
        <Image
          source={require("../assets/images/earthquake_1.png")}
          style={styles.earthquakeImage}
        />
        </View>
        <Text>Sentinel shows you the earthquake alerts here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    paddingHorizontal: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  earthquakeImage: {
    width: Dimensions.get("screen").width/1.1,
    height: Dimensions.get("screen").width/1.1,
    resizeMode: 'contain',
    // backgroundColor: 'black'
    borderRadius: 20,
  },
});
