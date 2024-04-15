import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { updateProfileReducer } from "../redux/reducers/auth.slice";
import { editUser } from "../axios/axiosConfig";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserInformation() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  console.log(userData);
  const [name, setName] = useState(userData?.username || "");
  const [dob, setDob] = useState(userData?.dob || "");
  const [gender , setGender] = useState(userData?.gender || "");
  const [height, setHeight] = useState(userData?.height || "");
  const [weight, setWeight] = useState(userData?.weight || "");
  const [bloodGroup, setBloodGroup] = useState(userData?.bloodType || "A+");
  const [allergyNotes, setAllergyNotes] = useState(
    userData?.allergies?.join(", ") || ""
  );
  const [isPregnant, setIsPregnant] = useState(
    userData?.isPregnant || false
  );
  const [dueDate, setDueDate] = useState(userData?.dueDate || null);
  const [medicationNotes, setMedicationNotes] = useState(
    userData?.medication?.join(", ") || ""
  );
  const [address, setAddress] = useState(userData?.address || "");
  const [medicalNotes, setMedicalNotes] = useState(
    userData?.medicalNotes || ""
  );
  const [isOrganDonor, setIsOrganDonor] = useState(
    userData?.isOrganDonor || false
  );



  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert("Name is required");
        return;
      }

      if (!dob) {
        alert("Date of Birth is required");
        return;
      }

      if (!height.trim() || !weight.trim()) {
        alert("Height and Weight are required");
        return;
      }

      if (isPregnant === "pregnant" && !dueDate) {
        alert("Due Date is required for pregnant users");
        return;
      }

      const updatedUserData = {
        username: name,
        dob: dob,
        gender: gender,
        height: height,
        weight: weight,
        bloodType: bloodGroup,
        allergies: allergyNotes,
        isPregnant: isPregnant,
        dueDate: dueDate,
        medication: medicationNotes,
        address: address,
        medicalNotes: medicalNotes,
        isOrganDonor: isOrganDonor,
      };
      const response = await editUser(userData._id, updatedUserData);
      dispatch(updateProfileReducer(response));
      alert("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information", error);
      alert("Error updating user information");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Information</Text>
        <View style={styles.container}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Text>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            value={dob}
            onChangeText={(text) => setDob(text)}
            keyboardType="numeric"
          />

          <Text>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />

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

          <Text>Medical Notes:</Text>
          <TextInput
            style={[styles.input, styles.largeInput]}
            placeholder="Enter medical notes"
            value={allergyNotes}
            onChangeText={(text) => setAllergyNotes(text)}
          />

          <Text>Pregnancy Status:</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={isPregnant}
            onValueChange={() => {}}
          >
            <Picker.Item label="Not Pregnant" value="false" />
            <Picker.Item label="Pregnant" value="yes" />
          </Picker>

          {/* {isPregnant === "pregnant" && (
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
          )} */}

          {/* <Text>Medication Notes:</Text>
          <TextInput
            style={[styles.input, styles.largeInput]}
            placeholder="Enter medication notes"
            value={medicationNotes}
            onChangeText={(text) => setMedicationNotes(text)}
          /> */}

          <Text>Residential Address:</Text>
          <TextInput
            style={[styles.input, styles.largeInput]}
            placeholder="Enter residential address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text>Medical Notes:</Text>
          <TextInput
            style={[styles.input, styles.largeInput]}
            placeholder="Enter medical notes"
            value={medicalNotes}
            onChangeText={(text) => setMedicalNotes(text)}
          />

          <Text>Organ Donor:</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={isPregnant}
            onValueChange={() => {}}
          >
            <Picker.Item label="No" value="false" />
            <Picker.Item label="Yes" value="true" />
          </Picker>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <View>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  container: {
    padding: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  input: {
    marginTop: 10,
    borderColor: "gray",
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
    backgroundColor: "#D6D6D6",
  },
  largeInput: {
    height: 100,
  },
  picker: {
    backggroundColor: "black",
  },
  pickerItem: {
    color: "black",
  },
  saveButton: {
    backgroundColor: "#F8BCBC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
});
