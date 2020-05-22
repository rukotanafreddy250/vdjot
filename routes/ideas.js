const express = require('express');
const mysql = require('mysql');
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

// idea index page
                                        // app.get('/ideas',(req,res) => {
                                        //     res.redirect('ideas/index');
                                        // });
//add idea form
router.get('/add',ensureAunticated,(req,res) =>{
    res.render('ideas/add');
});



                    // //edit posts
                    // app.get('/ideas/edit/:id',(req,res) =>{
                    //     let id = req.params.id;
                    //     // let title_edit = ""
                    //     // let body_edit= "";
                    //     let sql_2= `select * from post where id = ${id}`;
                    //     // let sql = `UPDATE post set title = ${title},body =${body} WHERE id = ${id}`;
                    //     db.query(sql_2,(err, results)=>{ 
                    //         if(err) throw err;
                    //         console.log('UPDATE');
                    //         // console.log(results);
                    //         for(i=0;i<results.length;i++){
                    //             let row = results[i];
                    //             console.log(row['title']);
                    //             console.log(row['body']);
                    //             const body_edit = row['body'];
                    //             const title_edit = row['title'];
                    //         }
                    //     });
                    //     res.render('ideas/edit',{
                    //         title_edit:title_edit,
                    //         body_edit:body_edit
                    //     });
                    // });


//delete route

                // app.get('/ideas/delete',(req,res) =>{
                //     res.render('ideas/delete/',{

                //     });
                // });


//delete post 
                    // app.delete('/ideas/delete/:id',(req,res) =>{
                    //     let sql = 'delete from post where id=?';
                    //     let query = db.query(sql,[req.params.id],(err,results)=>{
                    //         if(err) throw err
                    //         console.log(results);
                    //         res.send("delete succefully");
                    //         for(r=0;r<results.length;r++){
                    //             let row = results[r];
                    //             console.log(row['id']);
                    //             console.log(row['body'].row['id']);
                    //         }
                    //     })
                    //     res.redirect('ideas/delete/:id');
                    // });
// edit form
router.get('/edit/:id',ensureAunticated,(req,res) => {
    let id = req.params.id;
    let title_edit = req.body
    let body_edit= 
    // let sql_2= `select * from post where id = ${id}`;
    // let sql = `UPDATE post set title = ${title},body =${body} WHERE id = ${id}`;
    // db.query(sql_2,(err, results)=>{ 
    //     if(err) throw err;
    //     console.log('UPDATE');
    //     // console.log(results);
    //     for(i=0;i<results.length;i++){
    //         let row = results[i];
    //         console.log(row['title']);
    //         console.log(row['body']);
    //         const body_edit = row['body'];
    //         const title_edit = row['title'];
    //     }
    // });
    res.render('ideas/edit',ensureAunticated,{
        id:id
    });
});
// edit form process
router.put('/:id',ensureAunticated,(req,res)=>{
    console.log(req.body.title);  
    let id = req.params.id;
    let title_edit = req.body.title;
    let body_edit= req.body.details;
    // let sql_2= `select * from post where id = ${id}`;
    // let sql = `UPDATE post set title = ${title_edit},body =${body_edit} WHERE id = ${id}`;
    let sql = 'UPDATE post SET ? WHERE id ='+ `${req.params.id}`;
    let items = {title:`${title_edit}`,
                body:`${body_edit}`};
    let item_id = {id:`${id}`};
    console.log(req.body.title);
    db.query(sql,items,(err, results)=>{
        if(err) throw err;
        console.log('UPDATE');
        // console.log(results);
        for(i=0;i<results.length;i++){
            let row = results[i];
            console.log(row['title']);
            console.log(row['body']);
            const body_edit = row['body'];
            const title_edit = row['title'];
        }
    });
    // res.send('put');
    req.flash('success_msg', 'Video Post Updated');
    res.redirect('/ideas/getPosts');
});
router.delete('/:id',ensureAunticated,(req,res) =>{
    let results = "";
    let id = req.params.id;
    let sql = `DELETE FROM post WHERE id = ${id}`;
    let sql_2 = 'select * from post';
    let query = db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }else{
            // res.redirect('/ideas/getPosts');
        }
        console.log(results);
        // // res.send("delete succefully");
        // for(r=0;r<results.length;r++){ 
        //     let row = results[r];
        //     console.log(row['id']);
        //     console.log(row['body'].row['id']);
        // } 
    });
    // res.render('ideas/delete',{
    //     delete:'delete succefully'
    // });
    // res.render('ideas/getPosts',{
    //     results:results
    // });
    // res.render('ideas/getPosts',{
    //     results:results
    // });
    req.flash('error_msg', 'Video Post removed');
    res.redirect('/ideas/getPosts');
});

// getpPosts
router.get('/getPosts',ensureAunticated,(req,res)=>{
    let title = "";
    let body = "";
    let row = "";
    let sql_list = [];
    let sql = 'select * from post';
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        // for(r=0;r<results.length;r++){
        //     let row = results[r];
        //     let row_body = 
        //     console.log(row['body']);
        //     console.log(row['id']);
        //     sql_list.push({
        //         Id:row['id'],
        //         title:row['title'],
        //         body:row['body']
        //     });
        //     sql_list.forEach((element) => {
        //         console.log(element);
        //     });
        // }
        res.render('ideas/getPosts',{
            // Id:row['id'],
            // title:row['title'],
            // body:row['body'],
            results:results
        });
    });
});
// process form
router.post('/',ensureAunticated,(req,res)=>{
    // console.log(req.body);
    // res.send('ok');
    let errors = [];
    let title = req.body.title;
    let details = req.body.details;

    if(!req.body.title){
        errors.push({text:'please add title'});
    }
    if(!req.body.details){
        errors.push({text:'please add same Details'});
    }
    if(errors.length > 0){
        res.render('ideas/add',{
            errors:errors,
            title:"",
            details:""
        });
    }   else {
        let sql = "INSERT INTO post set ?";
        let idea = {title:`${title}`,body:`${details}`};
        // db.query(sql,(error,results)=>{

        // })
        let query = db.query(sql,idea,(err,results)=>{
            if(err) throw err;
            console.log(results);
            // res.send("idea Posted");
            // res.render('ideas/getPosts');
        })
        req.flash('success_msg', 'Video Post added');
        res.redirect('ideas/getPosts');
    }
});
module.exports = router;