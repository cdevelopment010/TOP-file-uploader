const { Router } = require("express"); 
const fileRouter = Router(); 
const fileController = require("../controllers/fileController");
const upload = require("../config/multer"); 



fileRouter.get("/create", fileController.getFileForm);
fileRouter.post("/create", upload, fileController.postFileForm)
fileRouter.get("/delete/:id", fileController.getDeleteFile);
fileRouter.post("/delete/:id", fileController.postDeleteFile);
// fileRouter.get("/update/:id", fileController.getUpdateFile);
// fileRouter.post("/update/:id", fileController.postUpdateFile);
fileRouter.get("/:id", fileController.getFileById);

module.exports = fileRouter; 