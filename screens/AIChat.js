import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, View, StyleSheet , Text } from 'react-native';

const AIChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    if (userInput.trim() !== '') { // Check for empty input before sending
      setChatHistory([...chatHistory, { user: true, message: userInput }]);
      setUserInput(''); // Clear input field after sending
      // Simulate AI response (replace with your actual AI integration)
      setTimeout(() => {
        setChatHistory([...chatHistory, { user: false, message: 'AI response here...' }]);
      }, 1000); // Simulate a 1-second delay
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatWindow}>
        {chatHistory.map((message, index) => (
          <View key={index} style={message.user ? styles.userMessage : styles.aiMessage}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    padding: 40,
  },
  chatWindow: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
});

export default AIChat;
