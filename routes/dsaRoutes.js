const express=require('express');
const dsaRoutes = express.Router();
const questionModel=require('../model/question');

dsaRoutes.get('/',async (req,res)=>{
    
        try {
            const questions = await questionModel.find()
            res.status(200).json({ success:true, result: questions })
        } catch (error) {
            console.log(error)
            res.status(501).json( { success:false, err: error.message } )
        }
    
});

module.exports=dsaRoutes;