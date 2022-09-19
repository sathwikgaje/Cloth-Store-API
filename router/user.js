const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const joi = require('joi')
const User = require('../models/user')
const validate = require('../middlewares/auth')
const validateUser = require('../middlewares/validateuser')

router.get('/',validate,async(req,res)=>{
    const result = await User.find()
    let arr = []
    for(i of result){
        let temp = {
            id:i._id,
            name:i.name,
            email:i.email
        }
        arr.push(temp)
    }
    res.send(arr)
})

router.post('/add',async(req,res)=>{
    const validate = validateUser(req.body)
    if(validate.error){
        res.status(400).send(validate.error.details[0].message)
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashed
        })
        const result = await user.save()
        res.send(result)
    }
})

router.delete('/:id',validate,async(req,res)=>{
    const result = await User.findByIdAndRemove(req.params.id)
    res.send(result)
})

module.exports = router