import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const AIChat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const scrollViewRef = useRef(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const API_KEY = "AIzaSyAZYQ3LNWFUYBoAqHAO0rMyM43Wqyuo0dQ";
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setLoading(true);
    setButtonLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      const responseText =
        responseData.candidates[0]?.content?.parts[0]?.text || "";

      setChatHistory([
        ...chatHistory,
        { user: true, message: userInput },
        { user: false, message: responseText },
      ]);
      setUserInput("");
      setScrollToBottom(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (scrollToBottom) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.spacing}>
        <Text style={styles.title}>Sentinel AI</Text>
      </View>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatWindow}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={message.user ? styles.userMessage : styles.aiMessage}
          >
            <Text style={styles.messageText}>{message.message}</Text>
            {message.user && loading && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="small"
                color="#0000ff"
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity
  title="Send" // Removed for clarity (doesn't work with TouchableOpacity)
  onPress={sendMessage}
  style={styles.sendButton}
  disabled={loading}
>
  {buttonLoading ? (
    <ActivityIndicator color="#0000ff" />
  ) : (
    <Text>Send</Text>
  )}
</TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  spacing: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  chatWindow: {
    padding: 10,
  },
  userMessage: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
    maxWidth: "70%",
  },
  aiMessage: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  sendButton: {
    backgroundColor: "#D6D6D6",
    paddingHorizontal: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 1,
    borderColor: 'grey',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#D6D6D6",
    width: '60%'
  },
  loadingIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default AIChat;
