const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const User = require('../models/User');


var commentSchema = new Schema({

    userId: String,
    postId: Number,
    comment:  {
        type: String,
        required: true
    }

});
const PostSchema = new Schema({
    
    by: [{type : mongoose.Schema.Types.ObjectId ,ref :'User'}] ,
   
    price:{
        type: Currency,
        required: true,
        min: 0
    },
    type: {
        type: String,
        required: true
    },
    pets: {
        type:Boolean,
        default :false    
    },
    smoking: {type:Boolean},
    gender: {type: String},

    date:{
        type: Date,
        default: Date.now
    },
    images: {
        type: [String],
        //required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    sub_address:{
        type: String,
        required: true
    },
    latitude: {type: Number},
   
    longitude: {type: Number},
    
    likes: [{type : mongoose.Schema.Types.ObjectId ,ref :'User'}] ,

    comments:[commentSchema]
    
});
module.exports = mongoose.model('Posts', PostSchema);