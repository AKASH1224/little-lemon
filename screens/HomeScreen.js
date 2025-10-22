import React, { useEffect, useState } from "react";
import { Image,View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation}) => {
  const [isLoading,SetLoading]=useState(true);
  const [data,setData] = useState([]);

  const getMenu= async ()=> {
    try {
      const response =await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json");
     const json = await  response.json();
     setData(json.menu)
     console.log("succesful");

    } catch (error) {
      console.log("error");
    }finally{
      SetLoading(false);
    }
  };
  useEffect(()=>{
    getMenu();
  },[]);



  const Item =({item})=>{
    return(
      <View style={styles.Menu}>
        <Text style={styles.text}>{item.category}</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.desc}</Text>
        <Text style={styles.text}>{item.price}</Text>

      </View>
    )
  }

  const renderItem=({item})=><Item item={item}/>
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("hasOnboarded");
    setHasOnboarded(false); // return to onboarding
  };
   


  return (
    <View style={styles.container}>
      {/*----------------- Banner----------------------------- */}
      <View style={styles.Banner}>
        <Text style={styles.Heading}>Little Lemon </Text>
        <Text>Chicago</Text>
        
        <Text>We are Focused owned meddoterean restraunts,
            focused on traditional recipes served  with  a modern twist</Text>
        <Image  source={require('../assets/Hero_image.png')} style={styles.BannerImg} />
 
      </View>
      {/**-----------------------* */ }

      {/*--------------- ----------------MainMenu---------------------------------------- */}
      <View style={styles.mainMenu}>
        <FlatList data={data} renderItem={renderItem}></FlatList>
      </View>
      {/*-------------------------------------------------------------------------------   */}
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate("Profile")}>
        
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
 container: { flex: 1 },  // full height
Banner: { flex: 1, width: "100%", backgroundColor: "#495E57" },
Menu: { flex: 2, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor:"grey" },
button: { flex: 1, justifyContent: "center", alignItems: "center" },
BannerImg:{
  height:100,width:120,

},

  buttonText: { color: "#fff", fontSize: 16 },

});
