const registerModel = require("../models/registerModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");


//@desc register a user
//@route POST /register
//@access public
const registerUser = asyncHandler( async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const register = await registerModel.create({

            name,
            email,
            password: hashPassword
        })

        console.log(register)
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }
});


//@desc login a user
//@route POST /login
//@access public
const loginUser = passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:'/login',
    failureFlash:true
})

//@desc home page
//@route GET /
//@access private
const homePage = (req, res) => {
    res.render("index.ejs",{name: req.user.name});
}

//@desc login page
//@route GET /login
//@access public
const loginPage = (req, res) => {
    res.render("login.ejs");
}

//@desc register page
//@route GET /register
//@access public
const registerPage = (req, res) => {
    res.render("register.ejs");
}

//@desc delete the session or logout
//@route DELETE /register
//@access private
const logout = (req,res)=>{
    req.logout(req.user, err => {
        if (err) return next(err)
       res.redirect("/")
    })
}

module.exports = {
    registerUser,
    loginUser,
    homePage,
    registerPage,
    loginPage,
    logout
}