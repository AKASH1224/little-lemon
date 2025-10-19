import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../component/Header";
const HomeScreen = ({ navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("hasOnboarded");
    setHasOnboarded(false); // return to onboarding
  };
 
  return (
    <View style={styles.container}>
      {/* <View>

      </View> */}
{/* 
      <FlatList data={menuItem} renderItem={renderItem}>

      </FlatList> */}
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate("Profile")}>
        
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1,  alignItems: "center" },
 
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#ff4d4d", padding: 12,marginTop:"170%", borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16 },

});
