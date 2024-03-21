const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) 
    return console.error(err.message);
});
let sql;
sql = `CREATE TABLE catalog(ISBN INTEGER PRIMARY KEY,Title,Cost,Topic)`;
//db.run(sql);
//db.run ("DROP TABLE catalog");
sql =`INSERT INTO catalog (Title,Cost,Topic) VALUES(?,?,?)`
db.run(sql,["title",25,"topic"],(err)=>{
    if(err) 
    return console.error(err.message);
})

sql=`SELECT * FROM catalog`;
db.all(sql,[],(err,rows)=>{
    if(err)
    return console.error(err.message);

    rows.forEach((row) => {
        console.log(row);
    });
})
