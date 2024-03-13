// create userApp mini express app
const exp=require('express');
const userApp=exp.Router();
const commonApp=require('./common-api');
const bcryptjs=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const verifyToken=require('../middlewares/verifyToken');

userApp.use(exp.json());

let usersCollection,articlesCollection;
userApp.use((req,res,next)=>{
  usersCollection=req.app.get('usersCollection');
  articlesCollection=req.app.get('articlesCollection');
  next();
});

// user reg route
userApp.post('/register',expressAsyncHandler(async(req,res)=>{
  const newUser=req.body;
  const dbUser=await usersCollection.findOne({username:newUser.username});
  if(dbUser!==null){
    res.send({message:"Username already exists"});
  }
  else{
    const hashedPwd=await bcryptjs.hash(newUser.password,6);
    newUser.password=hashedPwd;
    const dbRes=await usersCollection.insertOne({...newUser});
    if(dbRes.acknowledged===true){
      res.send({message:"Registration Successful"});
    }
    else{
      res.send({message:"Registration Failed"});
    }
  }
}));

// user login route
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
  const userCred=req.body;
  const dbUser=await usersCollection.findOne({username:userCred.username});
  if(dbUser===null){
    res.send({message:"Invalid Username"});
  }
  else{
    const pwdMatch=await bcryptjs.compare(userCred.password,dbUser.password);
    if(pwdMatch===false){
      res.send({message:"Invalid Password"});
    }
    else{
      // create jwt and send
      const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:40});
      res.send({message:"Login Success",token:signedToken,user:dbUser});
    }
  }
}));

// add comments
userApp.post('/comment:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
  const articleId=req.params.articleId;
  const commentData=req.body;
  const dbRes=await articlesCollection.updateOne({articleId:articleId},{$addToSet:{comments:commentData}});
  if(dbRes.acknowledged===true){
    res.send({message:"Comment posted"});
  }
  else{
    res.send({message:"Failed to post Comment"});
  }
}));

// get articles of all users
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
  const articlesCollection=req.app.get('articlesCollection');
  const articlesList=await articlesCollection.find({status:"true"}).toArray();
  res.send({message:"All articles",payload:articlesList});
}));

module.exports=userApp;