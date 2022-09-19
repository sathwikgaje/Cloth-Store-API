const multer = require('multer')

const FileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
} 

module.exports = FileFilter