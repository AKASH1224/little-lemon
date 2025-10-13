import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';

const ProfileScreen = ({navigation, setHasOnboarded}) => {
    const [image, setImage] = useState("");
    const [email,setEmail] =useState("");
    const [Number,setNumber] =useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState ("");
    const [preferences, setPreferences] = useState({
        emailNotifications: false,
        pushNotifications: false,
        smsNotifications: false,
        terms: false,
    });


    useEffect(()=>{
        loadProfileData();
    },[])

    const loadProfileData = async ()=>{
        try {
        
        // get all saved value 
         const savedImages =await AsyncStorage.getItem("image");
         const savedFirstName =await AsyncStorage.getItem("firstName");            
         const savedLastName = await AsyncStorage.getItem("lastName");
         const savedPhoneNumber = await AsyncStorage.getItem("Number");
         const savedEmail = await AsyncStorage.getItem("preferences");
         
        //  Update the State the value
        
        if(savedImages) setImage(savedImages);
        if(savedFirstName) SetFirstName(savedFirstName);
        if(savedLastName) SetLastName(savedLastName);
        if(savedPhoneNumber) setNumber(savedPhoneNumber);
        if (savedPreferences) {
                setPreferences(JSON.parse(savedPreferences)); // Convert JSON string back to object
        }
    
    } catch (error) {
            console.log("Error loading profile data");
        }
    }

    
     
    const toggleCheckbox = (key) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    
  //Save each item individually
    
    const saveProfileData =async ()=>{
        try{
            await AsyncStorage.setItem("UserImage",image);
            await AsyncStorage.setItem("UserFirstName",firstName);
            await AsyncStorage.setItem("UserLastName",lastName);
            await AsyncStorage.setItem("UserEmail",email);
            await AsyncStorage.setItem("UserPhoneNumber",Number);
            Alert.alert("Successfully saved the Data");
            console.log("Successfully saved the Data");

        }catch(error){
            console.log("cant save the Data");

        }
    }

    // clear  the profileData

    const removeProfileData = async()=>{
        Alert.alert('Clear Form? ',
            'are sure u wnat to clear all the fields ',
            [{
                text:'Cancel',
                style:'cancel'
            },
           {
            text : 'Clear',
            style:'destructive',
                 onPress: () => {
                        // Clear all state to empty values
                        setImage("");
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setNumber("");
                        setPreferences({
                            emailNotifications: false,
                            pushNotifications: false,
                            smsNotifications: false,
                            terms: false,
                        });
                        Alert.alert('Form Cleared', 'All fields have been cleared');
                    }

           
        
        } ]
        )
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
      // Validate email
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (text && !emailRegex.test(text)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };
    
    const handleLogout = async() => {
        await AsyncStorage.removeItem("hasOnboarded");
        setHasOnboarded(false)
    }
    

//  ------------------------------ Components -------------------------------- 

    return(
         <ScrollView  style={styles.scrollView} contentContainerStyle={styles.contentContainer}     showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps="handled" >

            <Text style={styles.heading}>Personal Information</Text>
            
            {/* Only show button if no image is selected */}
            {!image && <Button title="Pick an image" onPress={pickImage} />}
              {/* Show image and change image button after selection */}
            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                </View>
            )}
       
            <Text style={styles.Name}>First name</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName}  title="First Name" placeholder="First Name"/>
            
            <Text style={styles.Name}>Last name</Text>
            <TextInput style={styles.input} title="Last Name"  value={lastName} onChangeText={setLastName} placeholder="Last Name"/>
            
            <Text style={styles.Name}>Email</Text>
            <TextInput  value={email} onChangeText={setEmail } keyboardType="email-adress"    inputMode="email"      style={styles.input}  placeholder="Email"/>
             
            <Text style={styles.Name}>Phone No</Text>
            <TextInput  value={Number} onChangeText={setNumber } autoComplete="email"    keyboardType="phone-pad"         style={styles.input}  placeholder="Email"/>
         
            <Text style={styles.email}> Email Notifications</Text>
               <View style={styles.checkboxRow}>             
                  <Checkbox value={preferences.emailNotifications}
                      onValueChange={() => toggleCheckbox('emailNotifications')}
                      
                      color={preferences.emailNotifications ? '#4630EB' : undefined} />
                      <Text style={styles.label}>Order Status</Text>

               </View>    
              {/* Footer Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={saveProfileData } style={styles.save_button}>
                    <Text style={styles.Text}>Save</Text>
                </TouchableOpacity>
           
           
            <TouchableOpacity onPress={removeProfileData } style={styles.cancel_button}>
                <Text style={styles.Text}>Cancel</Text>
            </TouchableOpacity>
            
            </View>


            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            
               <TouchableOpacity style={styles.button_a} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Skip To Home</Text>
            </TouchableOpacity>
        </ScrollView>
    
    )
}




const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer:
    {
      padding:20,
      paddingBottom:"100%",
    },
    heading: {
        fontSize: 26,
        fontWeight:"bold",
        textAlign: 'left',
        marginBottom: 20,
    },

    imageContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        marginVertical: 7,
        justifyContent: 'space-between',
        gap:5,
    },
    image: {
        height:100,
        width: 100,
        borderRadius: 100,
      
    },
      checkboxRow: 
        {
            flexDirection:"row",
            alignItems: 'left',
            marginBottom: 15,
        },
     label: 
     {
        marginLeft: 10,
        fontSize: 16,
    },
    
    changeButton: {
        width:"40%",
        height:"40%",
        padding:10 ,
        marginTop:"10%",
        marginRight:"20%",
        borderRadius: 30,
        backgroundColor: "#495E57",
    },
    changeButtonText: {
        color: '#fff',
        
        fontSize: 14,
    },
    Name:{
    paddingLeft:1,
    padding:7,
    fontSize:16,
    fontWeight:500,
    },

    email:{

        marginTop:10,
        fontSize:16,
        fontWeight:500,
     },
     
    input:{
       height:"5%",
    //    width:"80%",
       borderWidth: 1,
       borderRadius:10,
       paddingLeft:10,
       marginLeft:4,

    },

    buttonRow: 
    {
    flexDirection: 'row',        // Put buttons side by side
    justifyContent: 'space-between',
    marginTop: 15,
    gap:10,                     // Space between buttons
    
    },
    save_button:{
        flex:1,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#495E57",
        marginTop: 10,
        alignItems:"center",
        padding:12,  
    },
      cancel_button:{
        flex:1,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#f6f8f8ff",
        marginTop: 10,
        alignItems:"center",
        padding:12,  
  
    },
    button_a: {
        padding: 12,
        //  width: "94%",
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#EE9972",
        marginTop: 10,
    },
    button: {
        padding: 12,
    //    width: "94%",
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#F4CE14",
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
    }
})

export default ProfileScreen;