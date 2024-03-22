const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) 
    return console.error(err.message);
});
let sql;
function createCatalogTable(){
   sql = `CREATE TABLE IF NOT EXISTS catalog(ISBN INTEGER PRIMARY KEY,Title,Cost,Topic,Stock)`;
   db.run(sql)
}

function insertIntoCatalog(title,cost,topic,stock){
   sql =`INSERT INTO catalog (Title,Cost,Topic,Stock) VALUES(?,?,?,?)`
   db.run(sql,[title,cost,topic,stock],(err)=>{
    if(err) 
    return console.error(err.message);
})
}
function searchTopic(topic, callback){
    sql=`SELECT * FROM catalog where Topic = ?`;
    db.all(sql,[topic],(err,rows)=>{
        db.all(sql, [topic], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    })
    }  
function info(ISBN, callback) {
    const sql = `SELECT * FROM catalog WHERE ISBN = ?`;
    db.all(sql, [ISBN], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
}

function updateStock(stock,ISBN,callback){
    sql=`UPDATE catalog SET Stock = ? where ISBN = ?`;
    db.run(sql,[stock-1,ISBN],(err)=>{
        if(err)  callback(err, null);
        else console.error(err.message);
    })
        
    }


    
    module.exports = {
        createCatalogTable,
        insertIntoCatalog,
        searchTopic,
        info,
        updateStock
     }