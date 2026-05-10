//Imports
const express = require("express");
const mongoose =require("mongoose");
const Post = require("./models/Post");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create app
const app = express();

//middleware must come before routes

//server reads incomming data
app.use(express.json());

//check user logged in
const authMiddleware =(req, res, next) =>{
    try{
        //get token 
        const authHeader = req.header("Authorization");

        //if no
        if (!authHeader){
            return res.status(401).send("Access denied. No token");

        }
        //extraction token from beare <token>
        const token= authHeader.replace("Bearer", "").trim();

        //verfy token
        const verified =jwt.verify(token, process.env.JWT_SECRET);

        //attach user info to req
        req.user = verified;

        next();//move to next fun
    }catch(err){
        res.status(401).send("Invalid token");
    }
};

//Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

//routes

//test get route
app.get("/", (req, res) => { 
    res.send("Server is running");
});

//test post route
//post created by login user
app.post("/posts", authMiddleware, async(req,res) => {
    try{
        const newPost =new Post({...req.body, 
            userId: req.user.id}
        );
       const savedPost = await newPost.save();

        res.status(201).json({message:"Post created successfully",
            post: savedPost});
    } catch(err){
        console.log(err);
        res.status(500).send("Error saving post");
    }
});

//get only my post
app.get("/my-posts",authMiddleware, async(req, res) =>{
    try{
        const posts = await Post.find({userId:req.user.id});

        res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching posts");

    }
});

app.get("/posts", async(req, res) =>{
    try{
       const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching posts");
    }
});

app.post("/signup", async(req, res)=>{
    try{
        const{username,email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.send("user created")
    }catch(err){
        console.log(err)
        res.status(500).send("Error creating user");
    }
});

//jwt 
app.post("/login", async(req, res) =>{
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send("user not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).send("Invalid password");
        }

        const token =jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({message:"Login Successful", token});

    }catch(err){
        console.log(err);
        res.status(500).send("Login error");
    }
});

//start server(always bottom)
app.listen(5000, () =>{
    console.log("Server running on port 5000");

});


