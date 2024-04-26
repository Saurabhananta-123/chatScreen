import { SafeAreaView, StyleSheet, View } from "react-native";

import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
        console.log("User profile:", authUser.displayName, authUser.photoURL);
      } else {
      }
    });

    return () => unsubscribe();
  }, []);
  const Login = () => {
    signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed in
        navigation.replace("Home");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
          onSubmitEditing={Login}
        />
      </View>

      <Button title="Login" onPress={Login} containerStyle={styles.button} />
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
        type="outline"
        containerStyle={styles.button}
      />
    </View>
  );
};

export default Loginscreen;

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
