import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserInformation = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [allergyNotes, setAllergyNotes] = useState("");
  const [isPregnant, setIsPregnant] = useState("unknown");
  const [dueDate, setDueDate] = useState(null);
  const [medicationNotes, setMedicationNotes] = useState("");
  const [address, setAddress] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [isOrganDonor, setIsOrganDonor] = useState("unknown");

  const showDatePicker = async (currentDate, onChange) => {
    try {
      const defaultDate = currentDate || new Date();
      const { action, year, month, day } = await DateTimePickerAndroid.open({
        value: defaultDate, // Specify the initial date here
      });

      if (action !== DateTimePickerAndroid.dismissedAction) {
        onChange(new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text>Date of Birth:</Text>
        <TouchableOpacity onPress={() => showDatePicker(dob, setDob)}>
          <Text style={styles.input}>
            <Text style={styles.input}>
              {dob ? dob.toLocaleDateString() : "Select Date of Birth"}
            </Text>
          </Text>
        </TouchableOpacity>

        <Text>Height (cm):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />

        <Text>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />

        <Text>Blood Group:</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={bloodGroup}
          onValueChange={(value) => setBloodGroup(value)}
        >
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O-" value="O-" />
        </Picker>

        <Text>Allergy Notes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter allergy notes"
          value={allergyNotes}
          onChangeText={(text) => setAllergyNotes(text)}
        />

        <Text>Pregnancy Status:</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={isPregnant}
          onValueChange={(value) => setIsPregnant(value)}
        >
          <Picker.Item label="Unknown" value="unknown" />
          <Picker.Item label="Pregnant" value="pregnant" />
          <Picker.Item label="Not Pregnant" value="notPregnant" />
        </Picker>

        {isPregnant === "pregnant" && (
          <>
            <Text>Due Date:</Text>
            <TouchableOpacity
              onPress={() => showDatePicker(dueDate, setDueDate)}
            >
              <Text style={styles.input}>
                {dueDate ? dueDate.toLocaleDateString() : "Select Due Date"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text>Medication Notes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter medication notes"
          value={medicationNotes}
          onChangeText={(text) => setMedicationNotes(text)}
        />

        <Text>Residential Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter residential address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Text>Medical Notes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter medical notes"
          value={medicalNotes}
          onChangeText={(text) => setMedicalNotes(text)}
        />

        <Text>Organ Donor:</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={isOrganDonor}
          onValueChange={(value) => setIsOrganDonor(value)}
        >
          <Picker.Item label="Unknown" value="unknown" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>
        <TouchableOpacity
        style={styles.saveButton}
        >
          <View>
            <Text>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    backggroundColor: "black",
  },
  pickerItem: {
    color: "black",
  },
  saveButton: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20
  }
});

export default UserInformation;
