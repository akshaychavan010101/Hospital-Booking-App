const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const db = require("../models/index")
const {user} = require("../models/index")

const UserRouter = express.Router();

UserRouter.get("/",(req,res)=>{
    res.send("done");
})

UserRouter.post("/signup",async (req,res)=>{
    const {name,email,password,mobile} = req.body;
    
    try{
        const data = await db.user.create({
            name,
            email,
            mobile,
            password
        })
        if(data){
            res.send(data)

        }else{
            res.send("error")
        }
        
    }catch(err){
        res.send(err);

    }
})

UserRouter.post("/login",(req,res)=>{
    const {email,password} = req.body;
    try{

    }catch(err){

    }
    
})

UserRouter.get("/userDetails",auth(["admin","user"]),(req,res)=>{
    
})

UserRouter.get("/logout",(req,res)=>{
    
})

module.exports = {
    UserRouter
}


