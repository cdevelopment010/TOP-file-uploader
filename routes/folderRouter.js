const { Router } = require("express"); 
const folderRouter = Router(); 
const folderController = require("../controllers/folderController"); 

folderRouter.get("/create", folderController.getFolderForm);
folderRouter.post("/create", folderController.postFolderForm)
folderRouter.post("/delete/:id", folderController.postDeleteFolder);
folderRouter.get("/:id", folderController.getFolderById);

module.exports = folderRouter; 