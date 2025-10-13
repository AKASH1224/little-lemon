import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = ({ setHasOnboarded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleOnboardingComplete = async () => {
    if (!name || !email) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      // Settting the values of all field for the asyncStorage,and for passing to the main app.js 
      await AsyncStorage.setItem("hasOnboarded", "true");  
      setHasOnboarded(true); // triggers App.js to re-render to Home screen
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heade}>
        <Image
        source={require('../assets/lemo2.png')}
        style={styles.Image}/>
      <Text style={styles.title}>Little Lemon</Text>
      </View>
      
      
      <View style={styles.mainCompo}>
      <Text style={styles.subtitle}>Let Us get to know you</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
     </View>

     <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleOnboardingComplete}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
   backgroundColor: "#ffffff",
  },
  heade:{
    flex:"20%",
    backgroundColor:"",
   

 },
 Image:{ width: 80, height:70,resizeMode:"contain", borderRadius: 10 },
//  Middle and main componenet design
 mainCompo:{
 flex:"40%",
 backgroundColor:"#E6E6FA",

 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  // below footer comonete desgin
  
  
  footer:
  {
  flex:"20%",
  backgroundColor:"#fff",
  justifyContent:"center",
  alignItems: "center",
  },

  button: {
    backgroundColor: "#f9f905ff",
    borderRadius: 20,
    borderWidth:0.1,
    
    padding: 15,
    alignItems: "center",
    marginLeft:"30%",
    width:"40%",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
