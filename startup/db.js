const mongoose = require('mongoose')
const config = require('config')
const logger = require('./logging')

module.exports = function(){
    mongoose.connect(config.get('db'),{useUnifiedTopology: true})
        .then(()=>{
            logger.log({level:'info',message:`Connected to the Database ${config.get('db')}...`})
            console.log(`Connected to the Database ${config.get('db')}...`)
        })
        .catch((err)=>logger.log({level: 'info',message:err}))
}