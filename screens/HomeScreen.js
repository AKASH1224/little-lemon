
import React from "react";
import {Button, View, Text } from "react-native";
const HomeScreen =({navigation})=>{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="OnBoarding" onPress={() => navigation.navigate("OnBoarding")} />
      <Button title="Profile" color="#0c0c0dff" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}
export default HomeScreen ;