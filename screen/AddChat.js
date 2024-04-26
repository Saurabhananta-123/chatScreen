import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const AddChat = ({ navigation }) => {
  const [inputText, setInputText] = useState("");

  const addChat = async () => {
    const docRef = await addDoc(collection(db, "Chats"), {
      chatName: inputText,
    });
    navigation.replace("Home");
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={inputText}
        onSubmitEditing={addChat}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Press me" onPress={addChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    width: "80%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 8,
  },
});

export default AddChat;
