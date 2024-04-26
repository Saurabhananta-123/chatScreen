import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Loginscreen from "./screen/Loginscreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScren from "./screen/RegisterScren";
import "react-native-gesture-handler";
import HomeScreen from "./screen/HomeScreen";
import AddChat from "./screen/AddChat";
import Chatsccreen from "./screen/Chatsccreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={RegisterScren} />
        <Stack.Screen
          options={{ headerLeft: null }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="AC" component={AddChat} />
        <Stack.Screen name="CS" component={Chatsccreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
