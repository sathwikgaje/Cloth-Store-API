const logger = require('../startup/logging')

function errorMiddleware(err,req,res,next){
    logger.log({level: 'info',message:err})
    res.status(500).send("Internal Server Error")
}

module.exports = errorMiddleware