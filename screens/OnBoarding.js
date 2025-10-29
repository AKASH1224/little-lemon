import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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

      <View style = {styles.banner}>
              <View style={styles.heade}>
                <Image  source={require('../assets/lemo3.png')} style={styles.Image}/>
                 <Text style={styles.title}>Little Lemon</Text>
              </View>
      </View>
      
      <View style={styles.mainCompo}>
          <Text style={styles.subtitle}>Let us get to know you</Text>
           <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName} />

          <TextInput
           style={styles.input}
           placeholder="Enter your email"
           value={email}
           onChangeText={setEmail} />
       <TouchableOpacity style={styles.button} onPress={handleOnboardingComplete}>
           <Text style={styles.buttonText}>Get Started</Text>
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

 banner:
 {
  height:hp("50%"),
  backgroundColor:"#F27329",
  // borderBottomStartRadius:hp("10%"), 
  // borderBottomEndRadius:hp("10%"),   
  flexDirection:"row",
},
   heade:
   {
    flexDirection:"row",
    top:hp("8%"),
  },
  Image:
  { 
      width:90,
      top:45, 
      height:hp("11%"),
      resizeMode:"contain", 
      left:30,
  },
  
  title: 
  {
    fontSize: 34,
    left:35,
    top:65, 
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color:"#fff",
  },
  
//  Middle and main componenet design
 
mainCompo:{
 height:hp("65%"),
 backgroundColor:"#fff",
 borderTopLeftRadius:hp("8%"),
 borderTopRightRadius: hp("8%"),
 bottom:hp("4%"),
 padding:10,
 elevation:4,
 },

  subtitle: {
    fontSize: 18,
    fontWeight:600, 
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
   height:hp("33%"),
   backgroundColor:"#fff",
   justifyContent:"center",
   },

  button: {
    backgroundColor: "#F27329",
    borderRadius: 20,
    borderWidth:0.4,
    top:hp("8%"),
    padding: 16,
    alignItems: "center",
    marginLeft:"30%",
    width:"44%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  }
});
