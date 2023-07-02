const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtsecret="HaHa"

router.post("/createuser",
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ]
    , 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        let email=req.body.email
            let userData=await User.findOne({email})
            if (userData) {
                return res.status(400).json({success:false, error: "user already exist" });
            }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({

                //these are by default values
                // name:"Rishabh",
                name: req.body.name,
                password: secPassword,
                location: req.body.location,
                email: req.body.email
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


    router.post("/loginuser",[
        body('email', "Enter a Valid Email").isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
        try {
            let email=req.body.email
            let userData=await User.findOne({email})
            if (!userData) {
                return res.status(400).json({error: "Try Logging in with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(req.body.password,userData.password);
            if(!passwordCompare){
                return res.status(400).json({error: "Try Logging in with correct credentials" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtsecret);
            res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;