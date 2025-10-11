import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "./screens/Onboarding";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      if (value === "true") setHasOnboarded(true);
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (loading) return null; // optional splash

  return (
    <NavigationContainer>
      {hasOnboarded ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setHasOnboarded={setHasOnboarded} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding">
            {(props) => <Onboarding {...props} setHasOnboarded={setHasOnboarded} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
