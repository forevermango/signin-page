//APP.JS in ~/app.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
//mongoose
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `YOUR DATABASE NAME`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
   //use flash
    app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next(); 
   }) 
   app.use(bodyParser.urlencoded({ extended: true }));
   app.set("view engine", "ejs");

//placeholders for added task
const task = ["buy socks", "get money"];
//placeholders for removed task
const complete = ["finish jquery"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(3000); 

const PORT = process.env.PORT || 3000 
app.listen(PORT)