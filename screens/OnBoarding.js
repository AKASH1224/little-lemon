
import React,{useState} from "react";
import {View, TextInput, StyleSheet,Text,Image,Alert} from "react-native";

import {Button,style } from "react-native-paper";


const OnBoarding =  ({navigation})=>{
    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    return(
        <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
          <Image style={styles.logo} source= {require("../assets/lemo2.png")}></Image>
          <Text style={styles.Ltle_text}>Little Lemon </Text>
          </View>
        </View>
      
      
         <View style={styles.mainInfo}>
          <Text style={styles.txt}>Let Us get to know U</Text>     

          <Text>First Name</Text>
          <TextInput style={styles.input} placeholder="Enter ur first name" 
          value={name} blurOnSubmit={true} 
          onChangeText={setName} 
          editable={true}/>
                 
          <Text>Email</Text>
          <TextInput style={styles.input} placeholder="Email" 
          value={email} blurOnSubmit={true}    
          onChangeText={setEmail} editable={true}/>
            
        </View>
        <View  style={styles.footer}>
        {/* <Button  title="Next" onPress={()=>Alert.alert('Its nice to meet u')}/> */}
          <Button  mode="contained" buttonColor="#F4CE14" textColor="black"
         // replace so back button doesn't go back to onboarding
           onPress ={()=>(navigation.navigate("Home"))} 
            style ={styles.btn}>Next</Button>      
        </View>
    
    </View>
)
}
const styles = StyleSheet.create({
  // main body 
  container :
      {
        flex:1,
      },
      header:{
        paddingTop: 40,
        flex:1,
      },
      logo:{
      resizeMode:"contain",
      height:"40%",
      width:"40%",
      marginTop:"20%",
      alignSelf:"center",
      // marginRight:"30%",
     
    },
    Ltle_text:{
     alignSelf:"flex-end",
     fontWeight:"bold",
     fontSize:20,
    } ,   
    txt:{
    fontSize:20,
    paddingBottom:10,
    },
    
    mainInfo:{
      flex:2,
     backgroundColor:"#EDEFEE",
    },
     input: {
        width:"auto",
        height:"20px",
        borderColor:"black",
        borderWidth:2,
        borderRadius:4,
      },
    footer:{
        flex:1,
     },
 
    btn:{
     borderRadius:7,
     }, 

})
export default OnBoarding;