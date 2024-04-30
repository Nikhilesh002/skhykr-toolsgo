const exp=require('express');
const toolApp=exp.Router();
require('dotenv').config();
const bcryptjs=require('bcryptjs');
toolApp.use(exp.json());

let usersCollection,toolsCollection;
toolApp.use((req,res,next)=>{
  usersCollection=req.app.get('usersCollection');
  toolsCollection=req.app.get('toolsCollection');
  next();
});

// user reg route
toolApp.post('/register',async(req,res)=>{
  const newTool=req.body;
  const dbRes=await toolsCollection.insertOne({...newTool});
  if(dbRes.acknowledged===true){
    res.send({message:"Tool added Successfull"});
  }
  else{
    res.send({message:"Tool add Failed"});
  }
});

// get all tools
toolApp.get('/tools',async(req,res)=>{
  const dbRes=await toolsCollection.find().toArray();
  res.send({message:"Tool get Successfull",payload:dbRes});
})

// delte tools with id
toolApp.delete('/delete-id/:id',async(req,res)=>{
  const toolId=req.params.id;
  const dbRes=await toolsCollection.deleteOne({"toolid":toolId});
  // console.log(dbRes);
  if(dbRes.acknowledged===true){
    res.send({message:"Tool deleted Successfull"});
  }
  else{
    res.send({message:"Tool delete Failed"});
  }
});


// add comments
toolApp.post('/comment/:articleId',(async(req,res)=>{
  const articleId=Number(req.params.articleId);
  const commentData=req.body;
  const dbRes=await toolsCollection.updateOne({articleId:articleId},{$addToSet:{comments:commentData}});
  if(dbRes.acknowledged===true){
    res.send({message:"Comment posted"});
  }
  else{
    res.send({message:"Failed to post Comment"});
  }
}));

module.exports=toolApp;