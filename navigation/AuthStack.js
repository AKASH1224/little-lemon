// navigation/AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Header from "../component/Header";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack =createNativeStackNavigator();

export default function AuthStack({ setHasOnboarded }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false} }>
      <Stack.Screen name="Onboarding" options={{
        header: (props) => <Header {...props} />, // custom header for this screen
       }}>
        {(props) => <Onboarding {...props} setHasOnboarded={setHasOnboarded} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
