import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';


const PhoneNumberItem = React.memo(({ item: phoneNumber }) => (
    <View style={styles.phoneNumberContainer}>
      <Text style={styles.phoneNumberLabel}>{phoneNumber.label}</Text>
      
        <Text style={styles.phoneNumber}>{phoneNumber.number}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddContact(phoneNumber.number)}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      
    </View>
  ));
const ContactItem = React.memo(({ item }) => (
  <TouchableOpacity style={styles.contactItem}>
    <Text style={styles.contactName}>{item.name}</Text>
    {item.phoneNumbers && (
      <FlatList
        data={item.phoneNumbers}
        keyExtractor={(phoneNumber) => phoneNumber.id}
        renderItem={({ item: phoneNumber }) => <PhoneNumberItem item={phoneNumber} />}
      />
    )}
  </TouchableOpacity>
));

export default function AddContacts() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({});

      // Filter out contacts without phone numbers
      const contactsWithNumbers = data.filter((contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0);

      // Sort contacts alphabetically
      const sortedContacts = contactsWithNumbers.sort((a, b) => a.name.localeCompare(b.name));

      setContacts(sortedContacts);
    } else {
      console.log('Contacts permission denied');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const filteredContacts = () => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.phoneNumbers &&
          contact.phoneNumbers.some((phoneNumber) =>
            phoneNumber.number.includes(searchQuery)
          ))
    );
  };

  const groupedContacts = () => {
    const groupedContacts = {};
    filteredContacts().forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (groupedContacts[firstLetter]) {
        groupedContacts[firstLetter].push(contact);
      } else {
        groupedContacts[firstLetter] = [contact];
      }
    });
    return groupedContacts;
  };

  const renderContactItem = ({ item }) => <ContactItem item={item} />;

  const renderGroupedContacts = () => {
    const groupedContactsData = Object.keys(groupedContacts()).map(
      (letter) => ({
        title: letter,
        data: groupedContacts()[letter],
      })
    );

    return (
      <FlatList
        data={groupedContactsData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View key={item.title}>
            <Text style={styles.groupTitle}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id}
              renderItem={renderContactItem}
            />
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select up to 5 Emergency Contacts</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {renderGroupedContacts()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  phoneNumberLabel: {
    marginRight: 5,
    fontSize: 16,
    color: '#555',
  },
  phoneNumber: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
  }
});
