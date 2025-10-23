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
     
const imageUrl = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`;

    return(
      <View style={styles.card}>
       <Image style={styles.CardImg}  source={{uri:imageUrl}} />
      <View style={styles.cardContent}>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
   
        <Text style={styles.itemName}>{item.name}</Text>
        
        {/* Description */}
        <Text style={styles.description}>{item.desc}</Text>
        
        {/* Price */}
        <Text style={styles.price}>${item.price}</Text>
       
      </View>
    </View>
  );
};
  

  const renderItem=({item})=><Item item={item}/>
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("hasOnboarded");
    setHasOnboarded(false); // return to onboarding
  };
   


  return (
    <View style={styles.container}>
      {/*----------------- Banner----------------------------- */}
      <View style={styles.Banner}>
        <Text style={styles.BanHeading}>Little Lemon </Text>
        <Text style={styles.BanSubHead}>Chicago</Text>
        
        <Text style={styles.paraGrap}>We are family owned medditerean restraunts,
            focused on traditional recipes served  with  a modern twist</Text>
        <Image  source={require('../assets/Hero_image.png')} style={styles.BannerImg} />
 
      </View>
      {/**-----------------------* */ }

      {/*--------------- ----------------MainMenu---------------------------------------- */}
      <View style={styles.mainMenu}>
        <FlatList data={data} renderItem={renderItem}    keyExtractor={(item, index) => index.toString()}  
        contentContainerStyle={styles.listContainer}> </FlatList>
      </View>
      {/*-------------------------------------------------------------------------------   */}
      <View  style={styles.footer}>
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate("Profile")}>
        
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create ( 
  {


container: { flex:1,backgroundColor:"#fff"},
// full height
Banner: { 
  height:160, 
  width: "100%", 
  backgroundColor:"#F27329",
  paddingHorizontal:40,
  borderBottomStartRadius:40, 
  borderBottomEndRadius:40,
},
BanHeading:{
  fontFamily: 'Markazi',
  fontSize: 44,
  color:"white",
  fontWeight: 'bold',
},
BanSubHead:{
    fontFamily: 'Markazi',
  fontSize: 22,
  color:"white",
  fontWeight:"semibold",

},
paraGrap:{
fontSize:18,
color:"white",

},

BannerImg:{
  height:100,
  width:150,
  borderRadius:12,
  right:20,
  position:"absolute",
  

},

mainMenu: { flex: 2, width: "100%", backgroundColor:"#fff"},
card:{
  width:"80%",
  backgroundColor:"#fff",
  marginBottom: 10,
  borderRadius: 15,
  marginLeft:20,
  elevation:20,
},

CardImg: {
  width: '100%',  // Full width of card
    height: 100,    // Fixed height
    resizeMode: 'cover',
    borderRadius:16,  // Cover the area (may crop)
  },


footer:{height:80,backgroundColor:'#F27329'},
button: { height:60,width:70,borderRadius:12, justifyContent: "center",marginLeft:"40%",backgroundColor:"black" },
buttonText: { color: "#fff", fontSize: 16 },

});
