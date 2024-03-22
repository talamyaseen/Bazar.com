const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const app = express();
const port = 5000;

let ordersql = `CREATE TABLE IF NOT EXISTS "order" (order_number INTEGER PRIMARY KEY, item_number)`;
//db.run ("DROP TABLE 'order'");
//console.log('droopppp');

db.run(ordersql, (err) => {
    if (err) {
        console.error('Error in creating table:', err.message);
    } else {
        console.log('the order table created successfully');
    }
});

app.post('/purchase/:item_number', (req, res) => {
    const itemNumber = parseInt(req.params.item_number); 
    const insertQuery = `INSERT INTO "order" (item_number) VALUES (?)`;
    db.run(insertQuery, [itemNumber], (err) => {
        if (err) {
            console.error('Error in inserting the data:', err.message);
        } else {
            console.log('inserted successfully');
        }
    });

    const selectQuery = `SELECT * FROM "order"`;
    db.all(selectQuery, [], (err, rows) => {
        if (err) {
            console.error(' querying error:', err.message);
        } else {
            console.log('table result:');
            rows.forEach((row) => {
                console.log(row);
            });
        }
    });


    http.put('http://localhost:4000/info/'+req.params.item_number,(response)=>{
        response.on("data", (chunk)=>{
            const responseData = JSON.parse(chunk);
            res.json(responseData)

            if(responseData.stock>=0){
                //const dec = responseData.stock -1;
                http.put('http://localhost:4000/update/'+req.params.item_number, (req, res) => {
                    console.log("sucsess");
                });
            }
            else{
                console.log("This item is sold out");
            }
        });
})

    res.send('Purchase completed');
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});
