import React, { useEffect, useState } from "react";
import { Image,View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const HomeScreen = ({ navigation}) => {
  const [isLoading,setLoading]=useState(true);
  const [data,setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Vegetarian"); // e.g., Chicken
  
let [fontsLoaded] = useFonts({
  'MarkaziText': require('../assets/fonts/MarkaziText-VariableFont_wght.ttf'),
});
  

const getMealsByCategory=async(category)=>{
  setLoading(true);
   try{
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const json =await response.json();
    const meals = json.meals || [];
    const mealsWithPrice = json.meals.map(meal =>({...meal,price :(Math.random() * 100 ).toFixed()
    }));
    setData(mealsWithPrice);
   }
  catch(error){
     console.log("error");
     }finally{
      setLoading(false);
  }
}
  useEffect(()=>{
    getMealsByCategory(selectedCategory);
  },[selectedCategory]);



//Unused Meta Little lemon APi
  // const getMenu= async ()=> {
  //   try {
  //     const response =await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json");
  //    const json = await  response.json();
  //    setData(json.menu)
  //    console.log("succesful");

  //   } catch (error) {
  //     console.log("error");
  //   }finally{
  //     SetLoading(false);
  //   }
  // };  


//  Meta Little Lemon APiconst imageUrl = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`;
  


const Item =({item})=>{
     
const imageUrl = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`;

    
 return(
       <View style={styles.card}>
        <Image style={styles.CardImg}  source={{uri:item.strMealThumb}} />
       <View style={styles.cardContent}>
         
         <View style={styles.categoryBadge}>
           <Text style={styles.categoryText}>{selectedCategory}</Text>
         </View>
   
         <Text style={styles.itemName}>{item.strMeal}</Text>
         
         {/* Description */}
         <Text style={styles.description}>{item.idMeal}</Text>
        
         {/* Price */}
        <Text style={styles.price}>${item.price}</Text>
       
       </View>
     </View>
   );
 };



 // flatList
  const renderItem=({item})=><Item item={item}/>
  const categories = ["Vegetarian","Chicken","Seafood","Dessert","Breakfast","lamb", "Pasta",];
  
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("hasOnboarded");
    setHasOnboarded(false); // return to onboarding
  };
   


  return (
    <View style={styles.container}>
      {/*----------------- Banner----------------------------- */}
                  <View style={styles.Banner}>
                    <Text style={[styles.BanHeading, { fontFamily: fontsLoaded ? 'MarkaziText' : undefined }]}>
                      Little Lemon </Text>
                        <Text style={[styles.BanSubHead , {fontFamily:fontsLoaded ? 'MarkaziText' : undefined}]}>Chicago</Text>
                          <Text style={styles.paraGrap}> We are a family owned {"\n"} medditerean restraunts,
                                   {"\n"} focused on traditional {"\n"} recipes served  with a {"\n"} modern twist</Text>
                           {/* <Image  source={require('../assets/Hero_image.png')} style={styles.BannerImg} /> */}
                   </View>
                  <Image  source={require('../assets/Hero_image.png')} style={styles.BannerImg} />
                  
                   {/**-----------------------* */ }
                   <View style={styles.filterButtonContainer}>
                     <FlatList data={categories} horizontal={true}  renderItem={
                          ({item})=>{ const selected = item === selectedCategory;
                             return(
                             <TouchableOpacity   
                             onPress={()=> setSelectedCategory(item)}  
                             style={[styles.filterButton,selected ?styles.filterButtonSelected:null,]}>
                                 <Text style={[styles.filterText , selected ? styles.filterTextSelected :null]}>
                                  {item}
                                 </Text>
                              </TouchableOpacity>
                              );
                            }}/>
                    </View>
    
    
         {/*--------------- ----------------MainMenu---------------------------------------- */}
    
      <View style={styles.mainMenu}>
       {isLoading ? (<ActivityIndicator color="#F27329"  size="large"   style={{ marginTop: 40 }}  />): 
       (<FlatList data={data} renderItem={renderItem}     keyExtractor={(item) => item.idMeal} 
        contentContainerStyle={styles.listContainer}> 
        </FlatList>)}
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
  height:hp("29%"),
  width:wp("100%"), 
  backgroundColor:"#F27329",
  borderBottomStartRadius:20, 
  borderBottomEndRadius:20,
},
BanHeading:
{
  fontSize:hp("7%"),
  fontWeight:("10%"),
  bottom:15,
  left:14,
 color:"white",
},

BanSubHead:
{
  fontFamily: 'Markazi',
  fontSize:hp("5%"),
  color:"white",
  bottom:34,
  left:14,
  fontWeight:"semibold",
},

paraGrap:
{
fontFamily:"Jost",
fontSize:19,
fontWeight:"600",
color:"white",
bottom:38,
left:14,
},

BannerImg:{
  height:hp("15%"),
  width:wp("36%"),
  borderRadius:14,
  right:18,
  top:60,
  position:"absolute",
},

filterButtonContainer: {
  height:90,
  backgroundColor: "#fff",
  paddingLeft:14,
  paddingTop:9  ,
},

filterButton: {
  backgroundColor: "#eee",
  borderRadius: 15,
  marginRight: 18,  // Changed from marginLeft
  paddingHorizontal:8,
  paddingVertical: 10,    // Add vertical padding
  width:90,
  height: 40,
},
filterButtonSelected: {
  backgroundColor: "#F29f05",
},

filterText: {
  color: "#333",
  fontWeight: "600",
  fontSize:15,
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


footer:{height:60,backgroundColor:'#F27329'},
button: { height:30,width:70,borderRadius:12, justifyContent: "center",marginLeft:"40%",backgroundColor:"black" },
buttonText: { color: "#fff", fontSize: 16 },

});
