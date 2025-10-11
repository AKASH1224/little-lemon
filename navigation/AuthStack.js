// navigation/AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function AuthStack({ setHasOnboarded }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding">
        {(props) => <Onboarding {...props} setHasOnboarded={setHasOnboarded} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
