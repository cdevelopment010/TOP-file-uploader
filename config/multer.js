const multer = require("multer"); 
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/data/uploads')
//     }, 
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage}).single('fileUpload')

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage}).single('fileUpload')

module.exports = upload;