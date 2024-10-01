const { Router } = require("express"); 
const signInRouter = Router(); 
const signInController = require("../controllers/signInController"); 

signInRouter.get("/", signInController.getSignIn);

module.exports = signInRouter; 