const multer = require('multer')

const FileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

module.exports = FileStorage