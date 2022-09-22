const express = require('express')
const router = express.Router()
const joi = require('joi')
const Cloth = require('../models/cloth')
const validate = require('../middlewares/auth')
const postvalidateCloth = require('../middlewares/postvalidatecloth')
const putvalidateCloth = require('../middlewares/putvalidatecloth')


router.get('/',(req,res)=>{
    res.send("Welcome to Cloth Store")
})

router.get('/cloth',async(req,res)=>{
    const cloth = await Cloth.find()
    let arr = []
    for(i of cloth){
        let temp = {
            id:i.id,
            name:i.name,
            imageUrl:i.imageUrl,
            price:i.price,
            description:i.description,
            type:i.type
        }
        arr.push(temp)
    }
    res.send(arr)
})

router.get('/cloth/:id',async(req,res)=>{
    const cloth = await Cloth.find({id:req.params.id})
    if(cloth.length > 0){
        let arr = []
        for(i of cloth){
            let temp = {
                id:i.id,
                name:i.name,
                imageUrl:i.imageUrl,
                price:i.price,
                description:i.description,
                type:i.type
            }
            arr.push(temp)
        }
        res.send(arr)
    }
    else{
        res.status(404).send("The cloth with given id is not present")
    }
})

router.put('/cloth/:id',validate,async (req,res)=>{
    const cloth = await Cloth.find({id:req.params.id})
    if(cloth.length === 0){
        res.status(404).send("The cloth with given id is not present")
    }
    else{
        const validate = putvalidateCloth(req.body)
        if(validate){
            res.status(400).send(validate.details[0].message)
        }
        else{
        const cloth = await Cloth.findOneAndUpdate({id:req.params.id},{
            $set:{
                name : req.body.name,
                price : req.body.price,
                description : req.body.description,
                imageUrl : req.file,
                type : req.body.type
            }
            },{new:true})
            res.send(cloth)
        }
    }
})

router.delete('/cloth/:id',validate,async (req,res)=>{
    const result = await Cloth.findOneAndRemove({id:req.params.id})
    res.send(result)
})

router.post('/cloth',validate,async (req,res)=>{
    const validate = postvalidateCloth(req.body)
    if(validate){
        res.status(400).send(validate.details[0].message)
    }
    else{
        const r = await Cloth.find()
        num = 0
        for(let i of r){
            if(i.id > num){
                num = i.id
            }
        }
        num = num + 1
        const cloth = new Cloth({
            id:num,
            name:req.body.name,
            imageUrl:req.file.path,
            price:req.body.price,
            description:req.body.description,
            type:req.body.type
        })
        const result = await cloth.save()
        res.send(result)
    }
})

module.exports = router
