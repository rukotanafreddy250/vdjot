export const crtCnn = ()=>{
    const db = mysql.createConnection({
        host:'losthost',
        user:'root',
        password:'',
        dadtabase:'nodedb'
    });
}
export const conn = db.connect( (err)=> {
    if(err){
        console.error('error connecting Mysql');
        return;
        // throw err;
    }
    console.log('Mysql connected');
});