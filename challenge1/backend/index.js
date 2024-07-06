const express = require("express");
const cors=require("cors");
const app=express();
const Erreurhandler = require("./middleware/errorhandler.js");
const dotenv=require("dotenv");
const ConnectDb=require("./dataBase/main.js");
const {genertatoken,verifytoken}=require("./util/jwt.js");

dotenv.config();


app.use(express.json());//middleware
app.use(cors());

app.use("/hallowdev/falseKnight",require("./routes/Route2.js"));
app.use(Erreurhandler);


app.get("/verify",function(req,res){
    const token=req.query.token;
    const data=verifytoken(token);
    if(!data)
    {
            res.json("your token is invalid");
    }
    res.json(data);
    
    });


async function start(){
    try{
    await ConnectDb(process.env.DATABASE_URL);
    app.listen(process.env.PORT,()=>{console.log('server is on the port ' +process.env.PORT );});}
    catch{
        console.log("une erreur est apparu");
    }
}

start();

