import * as Sqlite  from "expo-sqlite";
let db =null;
// open (cerate ) DB onec
export const openDb =async () => {
    if (db) return db;
    db = await Sqlite.openDatabaseAsync("littlelemon_cart.db");
    return db;
};

export const  initDb =async()=>{
    const  database = await openDb();
    // use execAsync for Schema + Pragma(bulk statement)
   await database.execAsync(` 
    PRAGMA journal_mode =WAL;
    CREATE Table IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productID Text UNIQUE,
    title TEXT NOT NULL, 
    price REAL NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    metadata Text
    ); 
   `)
};


// add item to cart(if exists -> increase qty, else insert )
export const  addToCart = async (item) => {
    const database =await openDb();
    const pid = String(item.productId);
    const qtyToAdd = Number(item.qty ||1);
    // Check Existing
   const existing = await database.getFirstAsync("Select  * from cart WHERE Product =? ",pid) ;
   if(existing){
    const newQty =Number(existing.qty) + qtyToAdd;
    await database.runAsync("UPDATE cart SET qty =? WHERE productId = ? ",newQty,pid);
    return{updated:true,productId:pid,qty:newQty};
   }else{
    await  database.runAsync("Insert INTO cart (productId,title,price,qty,metadata) VALUES(?,?,?,?,?)",
        pid,
        item.title,
        Number(item.price),
        qtyToAdd,
        JSON.stringify(item.metadata || {})
    );
    const row =await database.getFirstAsync("Select * FROM cart WHERE productId =?",pid);
    return {inserted :true,row};
 }  
};

// get all items 
export const getCartItems = async() => {
    const database =await openDb();
    const rows = await database.getAllAsync("Select * from cart");
    // convert metadtaa back to object 
    return rows.map((r)=>({...r,metadata:r.metadata ?JSON.parse(r.metadata):null}));
};


// get single item
export const getCartItem = async(productId) =>{
    const database =await openDb();
    const row = await database.getFirstAsync("Select * FROM cart WHERE productId =?",String(productId));
    return row ? {...row,metadata :row.metadata ? JSON .parse(row.metadata) :null } : null;
};


// update qty to a specific value 
export const updateCartQty = async (productId,qty) =>{
    const database =await openDb();
    await database.runAsync("UPDATE cart  SET qty =? WHERE productId =?",Number(qty),String(productId));
    const updated = await getCartItem(productId);
    return updated;
};


// remove item
export const removeCartItem = async(productId) =>{
    const database = await openDb();
    await database.runAsync("DELETE FROM cart WHERE productId = ? ", String(productId));
    return true;
};

// clear Cart

export const clearCart = async()=>{
    const database = await openDb();
    await database.runAsync("DELETE FROM cart");
    return true;
}
