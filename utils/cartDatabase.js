import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("cart.db");

export const initDB = async ()=>{
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mealId TEXT,
      name TEXT,
      price REAL,
      image TEXT,
      quantity INTEGER
    );
  `);
};

export const addToCart = async (meal) => {
 await db.runAsync(
"INSERT INTO cart (mealId,name,price,image,quantity) VALUES (?,?,?,?,?)",
  [meal.idMeal,meal.strMeal,meal.price,meal.strMEalThumb,1]
 ) ;
};
// Get all items from cart
export const getCartItems = async () => {
  return await db.getAllAsync("Select * from Cart");
};

// Rmeove Specific Item
export const removefromCart =async (mealId) => {
  await db.runAsync("Delete FROM cart WHERE  melaId = ?",[mealId]);
  
};

// ✅ Clear full cart
export const clearCart = async () => {
  await db.runAsync("DELETE FROM cart");
};
