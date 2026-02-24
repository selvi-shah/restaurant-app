// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";

// const connection=async ()=>{
//     const dbName="restaurant-app-db";
//     const url="mongodb://localhost:27017"
//     const client= new MongoClient(url)
//     const connect=await client.connect();
//     return await connect.db(dbName)
// }

// export default connection;

import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/restaurant-app-db");
    console.log("✅ MongoDB Connected with Mongoose");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connection;