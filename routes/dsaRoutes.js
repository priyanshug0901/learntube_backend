const express=require('express');
const dsaRoutes = express.Router();

dsaRoutes.get('/',dsaController);