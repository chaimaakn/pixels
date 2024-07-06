const mongoose=require("mongoose");

async function ConnectDb(url){
   await mongoose.connect(url,
    {
        dbName:"Hollow",

    }
   );

   console.log("connected to the database");
}

module.exports=ConnectDb;