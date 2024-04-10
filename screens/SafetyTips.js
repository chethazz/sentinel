import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleTips = [
  {
    category: "General Safety",
    tips: [
      "Be aware of your surroundings and trust your instincts.",
      "Walk confidently and purposefully.",
      "Avoid walking alone at night or in isolated areas.",
      "Let someone know where you are going and when you expect to return.",
      "Carry a personal alarm or whistle.",
      "If you feel unsafe, call for help or go to a safe place.",
      "Don't accept rides from strangers or leave drinks unattended.",
      "Keep doors and windows locked at home and in your car.",
      "Don't overshare personal information on social media.",
    ],
  },
  {
    category: "Fire Safety",
    tips: [
      "Install and maintain smoke detectors and fire extinguishers.",
      "Have a fire escape plan and practice it with your family.",
      "Know how to use a fire extinguisher.",
      "Stop, drop, and roll if your clothes catch on fire.",
      "Close doors behind you to slow the spread of fire.",
      "Don't overload electrical outlets or use extension cords improperly.",
      "Never leave cooking unattended.",
    ],
  },
  {
    category: "Online Safety",
    tips: [
      "Use strong passwords and change them regularly.",
      "Be cautious about what personal information you share online.",
      "Be wary of phishing scams and suspicious links.",
      "Install antivirus and anti-malware software.",
      "Keep your operating system and software up to date.",
      "Be careful what you download and install.",
    ],
  },
  {
    category: "Home Safety",
    tips: [
      "Secure your home with locks and alarms.",
      "Don't let strangers into your home.",
      "Keep valuables out of sight.",
      "Be cautious about giving out personal information over the phone or online.",
      "Don't leave notes on your door indicating you're not home.",
    ],
  },
  {
    category: "Travel Safety",
    tips: [
      "Research your destination and be aware of local laws and customs.",
      "Let someone know your travel plans and itinerary.",
      "Keep your passport and valuables secure.",
      "Be cautious of strangers and avoid walking alone at night.",
      "Use official taxis and transportation services.",
      "Trust your instincts and avoid risky situations.",
    ],
  },
];

export default function SafetyTips() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Safety Tips</Text>
        {sampleTips.map((category, index) => (
          <React.Fragment key={index}>
            <View style={styles.tipContainer}>
              <Text style={styles.heading}>{category.category}</Text>
              {category.tips.map((tip, tipIndex) => (
                <Text key={tipIndex} style={styles.tip}>{`- ${tip}`}</Text>
              ))}
            </View>
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  tipContainer: {
    backgroundColor: "#DCDCDC",
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tip: {
    fontSize: 16,
    marginBottom: 4,
  },
});
