const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodedb'
});
db.connect( (err)=> {
    if(err){
        console.error('error connecting Mysql');
    }
});

function mySql(User){
    let sql = `select * from user where email =${User} `;
    db.query(sql,(err, results)=>{
        if(err) throw err
        console.log(results);
    })
}
mySql('freddy');