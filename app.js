require("dotenv").config(); 
const path = require("node:path");
const express = require("express");
const app = express(); 

const ejsLayouts = require('express-ejs-layouts');

const session = require("./config/session");
const passport = require("./config/passport");
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

const db = require("./prisma/queries");

const indexRouter = require("./routes/indexRouter");
const signInRouter = require("./routes/signInRouter");
const signUpRouter = require("./routes/signUpRouter");


app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(assetsPath));


app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs"); 
app.use(ejsLayouts);
app.set('layout', 'layout');
app.use(session);   
// app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next(); 
})


app.use("/", indexRouter); 
app.use("/sign-in", signInRouter); 
app.use("/sign-up", signUpRouter); 


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));