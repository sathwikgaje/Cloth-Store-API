require('express-async-errors')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const winston = require('winston')
const config = require('config')
const mongoose = require('mongoose')
const home = require('./router/home')
const user = require('./router/user')
const errorMiddleware = require('./middlewares/error')
const FileFilter = require('./startup/filefilter')
const FileStorage = require('./startup/filestorage')
const logger = require('./startup/logging')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(multer({storage:FileStorage,fileFilter:FileFilter}).single('image'))
app.use('/',home)
app.use('/user',user)
app.use(errorMiddleware)
require('./startup/prod')(app)

mongoose.connect(config.get('db'),{useUnifiedTopology: true})
        .then(()=>{
            logger.log({level:'info',message:`Connected to the Database ${config.get('db')}...`})
            console.log(`Connected to the Database...`)
        })
        .catch((err)=>logger.log({level: 'info',message:err}))

const port = process.env.PORT || 3000
const server = app.listen(port,()=>{
    logger.log({level: 'info',message:`Listen on port ${port}`})
    console.log(`Listen on port ${port}`)
})

module.exports = server
