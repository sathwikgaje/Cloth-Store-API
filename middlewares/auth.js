const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

async function validate(req,res,next){
    let email = req.headers['email']
    if(!email){
        res.status(401).send("Login to continue")
    }
    const result = await User.findOne({email:email})
    if(!result){
        res.status(401).send("Invaild Email")
    }
    else{
        next()
    }
}

module.exports = validate