const { Router } = require("express"); 
const folderRouter = Router(); 
const folderController = require("../controllers/folderController"); 

folderRouter.get("/create", folderController.getFolderForm);
folderRouter.post("/create", folderController.postFolderForm)
folderRouter.post("/delete/:id", folderController.postDeleteFolder);
folderRouter.get("/update/:id", folderController.getFolderForm);
folderRouter.post("/update/:id", folderController.postUpdateFolderForm)
folderRouter.get("/share/:id", folderController.getShareFolderForm)
folderRouter.post("/share/:id", folderController.postShareFolderForm)
folderRouter.get("/:id", folderController.getFolderById);

module.exports = folderRouter; 