const express=require("express");
const router=express.Router();
const userModel=require("../dataBase/modles/users.js");
const jwt=require("../util/jwt.js");
const hashUtile=require("../util/hash.js");
const CharacterModel=require("../dataBase/modles/character.js");


router.post("/register",async function(req,res){
const email=req.body.email;
const password=req.body.password;
const name=req.body.name;
const role=req.body.role;

if(!email || !password || !name || !role){
    res.json("Invalid body !! email or name or password not entered");
    return;
}
try{
const hashedPassword=await hashUtile.hashPassword(password);
await userModel.create({name,password: hashedPassword,email,role});

res.json("user created succesfuly");
}
catch(error){
console.log(error);    
res.json("an error has been detected");
}

});


router.post("/login",async function(req,res){
const email=req.body.email;
const password=req.body.password;


const user = await userModel.findOne({email:email});
if(!user){res.json("user not found");
    return;
}

const isValid=await hashUtile.comparePassword(user.password,password);
if(!isValid){
    res.json("password incorrect");
    return;
    
}
const token=jwt.genertatoken(user._id);
res.json({token});


});

router.post("/create/char",async function(req,res){

const name=req.body.name;
const Abilities=req.body.Abilities;
const PowerLevel=req.body.PowerLevel;
const Type=req.body.Type;
const Description=req.body.Description;
const Lifes=req.body.Lifes;
const Mana=req.body.Mana;
const Armor=req.body.Armor;
const Speed=req.body.Speed;
const Equipment=req.body.Equipment;
const Rank=req.body.Rank;
const Origin=req.body.Origin;
const Released=req.body.Released;
const email=req.body.email;
const password=req.body.password;

    if(!email || !password || !name || !Abilities || !PowerLevel || !Type || !Description || !Lifes || !Mana || !Armor || !Speed || !Equipment || !Rank || !Origin || !Released){
        res.status(401).json("Invalid body !! ");
        return;
    }

    try{
 
        const user = await userModel.findOne({email:email});
        if(!user){res.status(401).json("user not found");
            return;
        }
        
        const isValid=await hashUtile.comparePassword(user.password,password);
        if(!isValid){
            res.status(401).json("password incorrect");
            return;
            
        }
        
        if(user.role !== "Admin")
        {
            res.status(401).json("vous n'etes pas administrateur impossible de créer un caractére");
            return;
        }
        
        const char= await CharacterModel.findOne({name: name});
        if(char){
          res.status(401).json("the name of this character already exist !! please change it");
          return;
        }
        const token=jwt.genertatoken(user._id);

        await CharacterModel.create({
            name,
            Abilities,
            PowerLevel,
            Type,
            Description,
            Lifes,
            Mana,
            Armor,
            Speed,
            Equipment,
            Rank,
            Origin,
            Released
          });
    
    res.json("Character created succesfuly");
    }
    catch(error){
    console.log(error);    
    res.json("an error has been detected");
    }
    
    }
);
router.put("/update/char/:id", async function(req, res) {
    const id=req.params.id; 
    const name=req.body.name;
    const Abilities=req.body.Abilities;
    const PowerLevel=req.body.PowerLevel;
    const Type=req.body.Type;
    const Description=req.body.Description;
    const Lifes=req.body.Lifes;
    const Mana=req.body.Mana;
    const Armor=req.body.Armor;
    const Speed=req.Speed;
    const Equipment=req.body.Equipment;
    const Rank=req.body.Rank;
    const Origin=req.body.Origin;
    const Released=req.body.Released;
    const email=req.body.email;
    const password=req.body.password;
    try {
        const user = await userModel.findOne({email:email});
        if(!user){res.status(401).json("user not found");
            return;
        }
        
        const isValid=await hashUtile.comparePassword(user.password,password);
        if(!isValid){
            res.status(401).json("password incorrect");
            return;
            
        }
        if(user.role !== "Admin")
        {
            res.status(401).json("vous n'etes pas administrateur impossible de moddifier un caractére");
            return;
        }

        const char= await CharacterModel.findOne({ _id: id});

        if (!char) {
            return res.status(404).json({ error: "Character not found" });
        }
        const token=jwt.genertatoken(user._id);

        if (name) char.name = name;
        if (Abilities) char.Abilities = Abilities;
        if (PowerLevel) char.PowerLevel = PowerLevel;
        if (Type) char.Type= Type;
        if (Description) char.Description = Description;
        if (Lifes) char.Lifes = Lifes;
        if (Mana) char.Mana = Mana;
        if (Armor) char.Armor= Armor;
        if(Speed) char.Speed=Speed;
        if(Equipment) char.Equipment=Equipment;
        if(Rank) char.Rank=Rank;
        if(Origin) char.Origin=Origin;
        if(Released) char.Released=Released;
        // Attendre que la promesse de sauvegarde soit résolue
        await char.save();

        res.json("Character saved");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/delete/char/:id", async function(req, res) {
    const id = req.params.id;
    const email=req.body.email;
    const password=req.body.password;
    try {

        const user = await userModel.findOne({email:email});
        if(!user){res.status(401).json("user not found");
            return;
        }
        
        const isValid=await hashUtile.comparePassword(user.password,password);
        if(!isValid){
            res.status(401).json("password incorrect");
            return;
            
        }
        if(user.role !== "Admin")
        {
            res.status(401).json("vous n'etes pas administrateur impossible de supprimer un caractére");
            return;
        }

        const char = await CharacterModel.findOneAndDelete({ _id: id });

        if (!char) {
            return res.status(404).json({ error: "Character not found" });
        }

        res.json({ message: "Character deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get('/characters/all', async (req, res) => {
    try {
      const characters = await CharacterModel.find(); 
      res.json(characters); 
    } catch (err) {
      res.status(500).json({error: "Internal Server Error"  }); 
    }
  });
  

module.exports=router;