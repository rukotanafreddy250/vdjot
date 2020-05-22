const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const {ensureAunticated} = require('../helpers/Auth');

//mysql connection
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

//login route
router.get('/login',(req, res)=>{
    res.render('users/login');
});


//register route
router.get('/register',(req, res)=>{
    res.render('users/register');
});

//register from Post
router.post('/login',(req, res, next)=>{
    // let errors = [];
    //     // let email = req.body.email;
    //     // let passwod = req.body.password;
    //     if(req.body.email =""){
    //         errors.push({text:'email is required'});
    //     }
    //     if(req.body.password =""){
    //         errors.push({text:'passCode is required'});
    //     }
passport.authenticate('local', {
    successRedirect:'/ideas/getPosts',
    failureRedirect:'/users/login',
    failureFlash:true
})(req, res, next)
console.log(req.body);
});

//login from post
router.post('/register',(req, res)=>{
let errors = [];
let name = req.body.name;
let email = req.body.email;
let passwod = req.body.password2;

if(req.body.password !== req.body.password2){
    errors.push({
        text:'Password do not much'
    });
}
if(req.body.password.length < 4){
    errors.push({text:'passwod must be at least 4 Characters'});
}
if(errors.length > 0){
    res.render('users/register',{
        errors:errors,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        password2:req.body.password2
    });
}else{
    // res.send("passed");
    // let sql = `insert into users values ?`;
    // const newUser = {
    //                 name:req.body.name,
    //                 email:req.body.email,
    //                 password:req.body.password
    //             }
    // db.query(sql,user,(err, results)=>{
    //     if(err) throw err;
    //     console.log(results);
    //     res.flash('error_msg', 'You re registered, You can login!')
    //     res.render('users/login')
    // });

    // if()

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash) =>{
            if(err) throw err;
            let sql = `insert into users set ?`; 
            req.body.password= hash;
            let newUser = {
                Names:`${name}`,
                Email:`${email}`,
                Password:hash
            }
            db.query(sql,newUser,(err, results)=>{
                if(err) throw err;
                console.log(results); 
                req.flash('success_msg', 'You re registered, You can login!');
                res.redirect('/users/login');
            });
        })
    })  


    } 
    console.log(req.body);
});
// logout user route
router.get('/logout',(req, res)=>{
    req.logout();
    req.flash('success_msg',"You're logged Out!");
    res.redirect('/users/login');
})
//use routes
module.exports = router;
