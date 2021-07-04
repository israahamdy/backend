const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
router.use(bodyParser.json());
const User = require('../models/User');


//GET USER BY ID

router.get('/:id', async(req, res)=>{
    try{
        const user= await User.findById(req.params.id);
        res.statusCode = 200;
        res.json(User);
    }catch(err){
        res.json({message: err});
    }
});
module.exports = router;
