import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "./components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chat, setChats] = useState([]);

  console.log(chat);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigate to the login or home screen after successful logout
      navigation.navigate("Login"); // Change 'Login' to the name of your login screen
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Chats"),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setChats(newData);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerTitleAlign: "center", // Center the title

      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={handleLogout}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 20,
            width: 80,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("AC")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (chatId, chatName) => {
    navigation.navigate("CS", {
      id: chatId,
      name: chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {chat.map(({ id, data }) => (
          <CustomListItem
            id={id}
            key={id}
            chatName={data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
