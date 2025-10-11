import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default SplashScreen;
