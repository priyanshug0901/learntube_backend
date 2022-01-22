const express=require('express');
const dsaRoutes = express.Router();


dsaRoutes.get('/',(req,res)=>{
    res.send("<p>hello from dsa</p>");
});

module.exports=dsaRoutes;