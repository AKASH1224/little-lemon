import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";



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

  if (loading) return null; // Or show a SplashScreen component

  return (
    <NavigationContainer>
      {hasOnboarded ? (
        <AppStack setHasOnboarded={setHasOnboarded} />
      ) : (
        <AuthStack setHasOnboarded={setHasOnboarded} />
      )}
    </NavigationContainer>
  );
}
