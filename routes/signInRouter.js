const { Router } = require("express"); 
const signInRouter = Router(); 
const signInController = require("../controllers/signInController"); 

signInRouter.get("/", signInController.getSignIn);
signInRouter.post("/", signInController.postSignIn);

module.exports = signInRouter; 