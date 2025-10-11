import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ setHasOnboarded,navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("hasOnboarded");
    setHasOnboarded(false); // return to onboarding
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 Home Screen 🎉</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Reset Onboarding</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#ff4d4d", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16 },
});
