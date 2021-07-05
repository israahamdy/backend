const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
router.use(bodyParser.json());
const Post = require('../models/Post');
//const User = require('../models/User');

//GET ALL POSTS

router.get('/', async (req, res) => {
        try{
        const posts = await Post.find({});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
        }catch{
            res.json({message: err});
        }
    }
);

//GET POST BY ID

router.get('/:id', async(req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        res.statusCode = 200;
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

// ADD A NEW post

router.post('/', async (req, res) =>{

    try{
        const newPost = await Post.create(req.body);
        const savedPost = await post.save();
        res.statusCode = 200;
        console.log('Post Created ', savedPost);
        res.json(newPost);
    }catch(err){
        res.json({message: err});
    }



    /*const post = new Post({
        phone: req.body.phone,
        price: req.body.price,
        type: req.body.type,
        pets: req.body.pets,
        smoking: req.body.smoking,
        gender: req.body.gender,
        date: req.body.data,
        images: req.body.images,
        description: req.body.description,
        address: req.body.address,
        sub_address: req.body.sub_address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,

    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }*/
});

// UPDATE post BY ID

router.patch('/:id', async (req, res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
        res.statusCode = 200;
        res.send(updatedPost);
        
    } catch (err) {
        res.json({message: err});
    }


});

// DELETE post 

router.delete('/:id', async (req,res)=>{
    try {
        const removedPost = await Post.findByIdAndRemove(req.params.id, {useFindAndModify: false}); //remove({_id: req.params.id});
        res.statusCode = 200;
        res.json(removedPost);
    } catch (err) {
        res.json({message: err});
    }

});

// GET COMMENTS ON poct

router.get('/:Id/comments', async (req,res) => {
    try{
        const comment = await Post.findById(req.params.id);
        if (Post != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Post.comments);
            }
            else {
                err = new Error('Post ' + req.params.id + ' not found');
                err.status = 404;
            }
    }catch (err) {
        res.json({message: err});
    }
    
});

// ADD NEW COMMENT ON post

router.post('/:Id/comments', async (req, res) => {
    try{
        const comment = await Post.findById(req.params.id);
        if (Post != null) {
            Post.comments.push(req.body);
            Post.save()
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Post);                
        }
        else {
            err = new Error('Post ' + req.params.id + ' not found');
            err.status = 404;
        }
    }catch (err) {
            res.json({message: err});
    }
});

// UPDATE A COMMENT ON A post

router.patch('/:Id/comments/:commentId', async (req, res) => {
    try{
        const updatedComment= await Post.findById(req.params.Id);
        if (Post != null && Post.comments.id(req.params.commentId) != null) {

            Post.comments.id(req.params.commentId).comment = req.body.comment;                
            
            Post.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Post);

        }else if (Post == null) {
                err = new Error('Post ' + req.params.Id + ' not found');
                err.status = 404;
            
        }else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;           
        }
        }catch (err) {
            res.json({message: err});
    }
});

//DELETE A COMMENT ON a post

router.delete('/:Id/comments/:commentId', async (req, res) => {
    try{
        const deletedComment = Post.findById(req.params.Id)
        if (Post != null && Post.comments.id(req.params.commentId) != null) {
            Post.comments.id(req.params.commentId).remove();
            Post.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Post);                
        }
        else if (Post == null) {
            err = new Error('Post ' + req.params.id + ' not found');
            err.status = 404;
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;         
        }
    }catch (err) {
        res.json({message: err});
    }
});

// save ad

router.post('/:id/save', async (req, res) => {
    try{
        const save = await Post.findById(req.params.id);
        if (save && !User.saved_ads.$elemMatch(Post.id))  //if (Post != null && !User.saved_ads.$elemMatch(Post.id))  
        {  
            User.saved_ads.push(req.params.id);
            User.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(save.id);                
        }
        else if (!save){   //else if (Post = null){ 
            err = new Error('Post ' + req.params.id + ' not found');
            err.status = 404;
        }else{
            User.saved_ads.pull(req.body.id);
            User.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Post.id); 
        }
    }catch (err) {
            res.json({message: err});
    }
});

router.post('/:id/like', async (req, res) => {
    try{
        const like = await Post.findById(req.params.id);
        if (like && !like.likes.$elemMatch(User.id))  //if (Post != null && !User.saved_ads.$elemMatch(Post.id))  
        {  
            like.likes.push(User.id);
            like.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(like.id);                
        }
        else if (!like){   //else if (Post = null){ 
            err = new Error('Post ' + req.params.id + ' not found');
            err.status = 404;
        }else{
            like.likes.pull(User.id);
            like.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(like.id); 
        }
    }catch (err) {
            res.json({message: err});
    }
});
module.exports = router;