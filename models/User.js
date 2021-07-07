const mongoose = require('mongoose');
const Post = require('../models/Post');

const userSchema = mongoose.Schema({
    UID: {
        type: Date,
        default: Date.now
    },
    avatar:{type: String},
    username :{type: String},
    email: {type: String},
    phone: {type: String},
    saved_ads: ['Post'],
    work: String,
    workAt: String,
    study: String,
    studyAt: String,
    livesIn: String,
    from: String

});
module.exports = mongoose.model('User', userSchema);