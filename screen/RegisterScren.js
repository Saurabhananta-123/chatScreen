import { StyleSheet, Text, View } from "react-native";

import React, { useLayoutEffect, useState } from "react";
import { Button, Image, Input } from "react-native-elements";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScren = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const Register = async () => {
    createUserWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        console.log(userCredential.user.email);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl || "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png",
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setname(text)}
        />
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={Password}
          onChangeText={(text) => setPassword(text)}
          autoFocus
          type="password"
          onSubmitEditing={Register}
        />

        <Input
          placeholder="Photo URl"
          value={photoUrl}
          onChangeText={(text) => setPhotoUrl(text)}
          autoFocus
          type="text"
          onSubmitEditing={Register}
        />
      </View>

      <Button
        onPress={Register}
        title="Register"
        type="outline"
        containerStyle={styles.button}
      />
    </View>
  );
};

export default RegisterScren;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "blue",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 18,
  },
});
