const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParse = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const expressSession = require('express-session');
// const mongoose = require("mongoose");
const mysql = require('mysql');
const app = express();

// load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
// const draftMysql = require('./draftMysql');

// variables Users to store user from the database
const Users = new Object();

const {ensureAunticated} = require('./helpers/Auth');

// passport Config
require('./config/passport')(passport);

//connect to mongoose
// mongoose.connect('mongodb://localhost/vidjot-dev',{
//     useMongoClient: true
// })
// .then( () => console.log("MongoDB Connected...."))
// .catch( err => console.log(err));

// handlebars middleware

// import {crtCnn} from "./mysql_conn.js";

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodedb'
});
db.connect( (err)=> {
    if(err){
        console.error('error connecting Mysql');
        return;
        // throw err;
    }
    console.log('Mysql connected');
});
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//body-parser middle ware
app.use(bodyParse.urlencoded({ extended:false }))
app.use(bodyParse.json());

//
app.use(express.static(path.join(__dirname, 'public')));

//method override middleway
app.use(methodOverride('_method'));

//session-express middleway
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
//password middleware
app.use(passport.initialize());
app.use(passport.session());

//connect-flash middleway
app.use(flash());

// Global variables for flash messages
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.Users = req.Users || null;
    next();
})

app.use(function(req, res, next){
    // console.log(Date.now());
    req.name = "rukotana freddy";
    next();
});

const user = {
    
}

app.get('/',ensureAunticated, (req,res) =>{
    console.log(req.name);
    const title = "welcome to handlebars";
    res.render("INDEX",{
        title: title
    });
    // res.send(req.name);
});
app.get('/about', ensureAunticated,(req,res) =>{
    // res.send("about nodemon1");
    console.log("this about Page");
    res.render("About");
});

//use routes
app.use('/ideas', ideas);
app.use('/users', users);


const port = 5000;
app.listen(port, () =>{
    console.log(`server started on port ${port}`);
});