const express = require("express")
const connectDb = require("./config/dbConnection");
const bcrypt = require("bcrypt");
const registerModel = require("./models/registerModel");
const initiallizePassport = require("./passport-config")
const dotenv = require("dotenv").config();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override")
const errorhandler = require("./middleware/errorhandler");

connectDb();
const app = express();



initiallizePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);



app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session(
    {
        secret: "tejas",
        resave: false,
        saveUninitialized:false
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(require("./routes/userRoute"));
app.use(errorhandler);
app.listen(3000);