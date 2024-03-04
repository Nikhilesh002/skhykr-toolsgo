// create authorApp mini express app
const exp=require('express');
const authorApp=exp.Router();


// user reg route
authorApp.post('/registration',expressAsyncHandler(async(req,res)=>{
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
      res.send({message:'Registration Sussessful'});
    }
    else{
      res.send({message:'Registration Failed'});
    }
  }
}));

// user login route
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
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
      res.send({message:'Login Success',token:signedToken,user:dbUser});
    }
  }
}));

// get articles of only author
authorApp.get('/articles',expressAsyncHandler(async(req,res)=>{
  const articlesList=await articlesCollection.find().toArray();
  res.send({message:"All articles",payload:articlesList});
}));


module.exports=authorApp;