// create userApp mini express app
const exp=require('express');
const userApp=exp.Router();
require('dotenv').config();
const bcryptjs=require('bcryptjs');
userApp.use(exp.json());

let usersCollection,toolsCollection;
userApp.use((req,res,next)=>{
  usersCollection=req.app.get('usersCollection');
  toolsCollection=req.app.get('toolsCollection');
  next();
});

// user reg route
userApp.post('/register',async(req,res)=>{
  const newUser=req.body;
  const dbUser=await usersCollection.findOne({username:newUser.username});
  if(dbUser!==null){
    res.send({message:"Username already exists"});
  }
  else{
    const dbRes=await usersCollection.insertOne({...newUser});
    if(dbRes.acknowledged===true){
      res.send({message:"Registration Successful"});
    }
    else{
      res.send({message:"Registration Failed"});
    }
  }
});

// user login route
userApp.post('/login',(async(req,res)=>{
  const userCred=req.body;
  const dbUser=await usersCollection.findOne({username:userCred.username});
  if(dbUser===null){
    res.send({message:"Invalid Username"});
  }
  else{
    if(userCred.password===dbUser.password && userCred.username===dbUser.username){
      res.send({message:"Login Success",user:dbUser});
    }
    else{
      res.send({message:"Invalid Password"});
    }
  }
}));


module.exports=userApp;