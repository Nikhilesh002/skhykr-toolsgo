// create authorApp mini express app
const exp=require('express');
const authorApp=exp.Router();
const commonApp=require('./common-api');
const bcryptjs=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const verifyToken=require('../middlewares/verifyToken');

authorApp.use(exp.json());

let authorsCollection,articlesCollection;
authorApp.use((req,res,next)=>{
  authorsCollection=req.app.get('authorsCollection');
  articlesCollection=req.app.get('articlesCollection');
  next();
})


// author reg route
authorApp.post('/register',expressAsyncHandler(async(req,res)=>{
  const newUser=req.body;
  const dbUser=await authorsCollection.findOne({username:newUser.username});
  if(dbUser!==null){
    res.send({message:"Username already exists"});
  }
  else{
    const hashedPwd=await bcryptjs.hash(newUser.password,6);
    newUser.password=hashedPwd;
    const dbRes=await authorsCollection.insertOne({...newUser});
    if(dbRes.acknowledged===true){
      res.send({message:"Registration Successful"});
    }
    else{
      res.send({message:"Registration Failed"});
    }
  }
}));

// author login route
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
  const userCred=req.body;
  const dbUser=await authorsCollection.findOne({username:userCred.username});
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
      const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'});
      res.send({message:"Login Success",token:signedToken,user:dbUser});
    }
  }
}));

// post article by author
authorApp.post('/post-article',verifyToken,expressAsyncHandler(async(req,res)=>{
  const newArticle=req.body;
  const dbRes=await articlesCollection.insertOne(newArticle);
  if(dbRes.acknowledged===true){
    res.send({message:"Article created Successfully"});
  }
  else{
    res.send({message:"Article creation Failed"});
  }
}));

// update article by articleId
authorApp.put('/update-article',verifyToken,expressAsyncHandler(async(req,res)=>{
  const modArticle=req.body;
  const dbRes=await articlesCollection.updateOne({articleId:modArticle.articleId},{$set:{...modArticle}})
  if(dbRes.acknowledged===true){
    res.send({message:"Article updated Successfully"});
  }
  else{
    res.send({message:"Update Failed"});
  }
}));

// TODO sir told to send article and then update but i didnt like so 'todo'
// soft delete article by articleId
authorApp.put('/article/soft-delete/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
  const articleId=Number(req.params.articleId);
  const dbRes=await articlesCollection.updateOne({articleId:articleId},{$set:{status:false}});
  if(dbRes.acknowledged===true){
    res.send({message:"Article deleted Successfully"});
  }
  else{
    res.send({message:"Article delete Failed"});
  }
}));

// undo delete
authorApp.put('/article/restore/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
  const articleId=Number(req.params.articleId);
  const dbRes=await articlesCollection.updateOne({articleId:articleId},{$set:{status:true}});
  if(dbRes.acknowledged===true){
    res.send({message:"Article restored Successfully"});
  }
  else{
    res.send({message:"Article restore Failed"});
  }
}));

// get articles of only author
authorApp.get('/articles/:authorName',verifyToken,expressAsyncHandler(async(req,res)=>{
  const authorName=req.params.authorName;
  const articlesList=await articlesCollection.find({username:authorName}).toArray();
  res.send({message:"All articles",payload:articlesList});
}));


module.exports=authorApp;