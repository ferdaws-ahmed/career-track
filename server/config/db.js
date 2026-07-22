const {MongoClient} = require("mongodb");
const dotenv =  require("dotenv");
dotenv.config();

 const client = new MongoClient(process.env.MONGO_URI);

 let db; 


 const connectDB = async () => {
   try{
      await client.connect();
      db = client.db("careerTrackDB");
      console.log("MongoDB Connected Successfully");

   }catch(err){
    console.error("MongoDB Connection Error:", err);

    // if connection is failed, stop hole server
    process.exit(1);
   }
 };


 const getDB = () => {
  if(!db){
    throw new Error("Database not connected. Call connectDB first")
   
  }
   return db;
 }


 module.exports = {connectDB, getDB};
 