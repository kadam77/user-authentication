const express = require("express")
const registerModel = require("../models/registerModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
    registerUser,
    loginUser,
    homePage,
    registerPage,
    loginPage,
    logout
} = require("../controllers/userController")

router.post("/register",checkNotAuthenticated,registerUser);
router.post("/login",checkNotAuthenticated,loginUser);
router.get("/", checkAuthenticated,homePage);
router.get('/login', checkNotAuthenticated,loginPage);
router.get('/register',checkNotAuthenticated,registerPage);
router.delete("/logout",logout)

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}


module.exports = router;