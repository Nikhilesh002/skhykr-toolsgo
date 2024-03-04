// create commonApp mini express app
const exp=require('express');
const commonApp=exp.Router();


commonApp.get('/test-common',(req,res)=>{
  res.send({message:'Test common'});
  next();
})



module.exports=commonApp;