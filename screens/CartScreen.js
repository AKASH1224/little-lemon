import React,{useCallback, useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Sqlite from 'expo-sqlite';
import {useFocusEffect} from   '@react-navigation/native'; 

//Open Database  
const openDb = async()=>{
    const db = await Sqlite.openDatabaseAsync('littlelemon_cart.db');
    return db;
};

const CartScreen =() =>{

    const [cartItems,setCartItems] =useState([]);
    const [loading ,setLoading] =useState(true);
    
    
    // fetch all items from cart
   const fetchCartItems = async () =>{
     try{
        const db = await openDb();
        const rows = await db.getAllAsync('Select * from cart');
        setCartItems(rows);
     }
     catch(error)
     {
      console.error('error fetching cart',error);
     }
     finally
     {
        setLoading(false);
     }
    };

    // Delete Item

    const removeFromCart = async (id) =>{
        try{
         const db = await openDb();
         await db.runAsync('DELETE FROM cart WHERE id =? ',[id]);
         fetchCartItems(); //refresh list 

        }catch(error){
          console.error('error removing item',error);
        }
    };


    // Fetch Items on load
    
    useFocusEffect(
        useCallback( ()=>{
         setLoading(true);
         fetchCartItems();
        },[])

    );

    useEffect (()=>{
    fetchCartItems();
    },[]);

    if(loading) return <ActivityIndicator size ="large" style ={{flex:1}} />;

    return(
        <View style ={styles.container}>
           <Text style ={styles.heading}>Your Cart</Text>
           (cartItems.length === 0 ?(
            <Text style ={styles.emptyText}>your Cart is empty</Text>
           ):(
            <FlatList data={cartItems}
               keyExtractor={(item) =>item.id.toString()}
               renderItem={({item})=>(
                <View style ={styles.cartItem}>
                    <Image source ={{uri : JSON.parse(item.metadata)?.thumb}}
                    style ={styles.image}
                     />
                     <View style ={styles.info}>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text>{item.price}</Text>
                          <Text>{item.qty}</Text>
                     </View>
                     <TouchableOpacity onPress={()=> removeFromCart(item.id)}>
                        <Text style ={styles.delete}>Delete</Text>
                     </TouchableOpacity>
                    </View>
                    )}
                    />
           ))
        </View>
    )
}


const styles =StyleSheet.create({
    container :{
        flex:1,
        padding:16, backgroundColor:'#fff'
    },
    heading :{
        fontSize:22,
        fontWeight:'bold',
        marginBottom:10
    },
    emptyText:{
        textAlign:'center',marginTop:50,
        fontSize:18
    },
    cartItem:{
        flexDirection:'row',
        backgroundColor:"#f8f8f8f8",
        borderRadius:8,
        padding:10,
        marginBottom:10,
        alignItems:"center",
    },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  delete: { fontSize: 18, color: 'red' },




})
export default CartScreen;