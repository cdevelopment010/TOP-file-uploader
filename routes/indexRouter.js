const { Router } = require("express"); 
const indexRouter = Router(); 
const indexController = require("../controllers/indexController"); 

indexRouter.get("/", indexController.getHomePage);
indexRouter.get("/sign-out", indexController.signOut)
indexRouter.post("/delete/user/:id", indexController.deleteUser);

module.exports = indexRouter; 