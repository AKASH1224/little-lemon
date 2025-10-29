// navigation/AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Header from "../component/Header";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AuthStack({ setHasOnboarded }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Onboarding" options={{
        header: (props) => <Header {...props} />, // custom header for this screen
       }}   >
        {(props) => <Onboarding {...props} setHasOnboarded={setHasOnboarded} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
