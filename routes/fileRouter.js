const { Router } = require("express"); 
const fileRouter = Router(); 
const fileController = require("../controllers/fileController");
const multer = require("multer"); 
// const storage = multer.memoryStorage(); 
// const upload = multer({ storage: storage})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/data/uploads')
    }, 
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage}).single('fileUpload')

fileRouter.get("/create", fileController.getFileForm);
fileRouter.post("/create", upload, fileController.postFileForm)
// fileRouter.get("/delete/:id", fileController.postDeleteFolder);
// fileRouter.get("/:id", fileController.getFolderById);

module.exports = fileRouter; 