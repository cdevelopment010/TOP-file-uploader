const { Router } = require("express"); 
const signUpRouter = Router(); 
const signUpController = require("../controllers/signUpController"); 

signUpRouter.get("/", signUpController.getSignUp);

module.exports = signUpRouter; 