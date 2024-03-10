const express = require("express");
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');

JWT_SECRET='byali';

// for Signup
router.post('/signup',[
    // express validators
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be atlest 5 characters long').isLength({ min: 5 })
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ error: 'Enter a different Email Address' });
    } else {
        //making salt and genrating hash
        const salt=await bcrypt.genSalt(10);
        const pass=await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: pass
        });
        const token=jwt.sign({id:user.id},JWT_SECRET)
        res.json({ok:true,token:token});
    }
});

//for the login
router.post('/login',[
    //express validators
    body('email','Enter a valid Email').isEmail(),
    body('password','Password can not be Blank').exists()
],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    let user = await User.findOne({ email: email });
    if(user){
        const cres=await bcrypt.compare(password,user.password);
        if(cres){
            const token=jwt.sign({id:user.id},JWT_SECRET);
            res.json({ok:true,token});
        }
        else{
            res.status(400).json({error:'Incorrect email and password.'});
        }
    }
    else{
        res.status(400).json({error:'Incorrect email and password.'});
    }
});

//checking user is loged in or not
router.post('/getuser',fetchUser,async(req,res)=>{
    const userid=req.user.id;
    const user=await User.findById(userid).select("-password");
    res.json(user);
});

module.exports = router;