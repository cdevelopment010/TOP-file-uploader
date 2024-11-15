const { Router } = require("express"); 
const shareRouter = Router(); 
const shareController = require("../controllers/shareController"); 

shareRouter.get("/:shareId", shareController.getSharedFolderById);

module.exports = shareRouter; 