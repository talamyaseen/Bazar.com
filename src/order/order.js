const express = require('express');
const http = require('http');
const axios = require('axios');
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
    
    const itemNumber = req.params.item_number; 
    console.log(itemNumber);
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


    http.get('http://localhost:4000/info/' + req.params.item_number,(response)=>{
        var responseData='';
        response.on("data", (chunk)=>{
           responseData = JSON.parse(chunk);
            res.json(responseData)
        });
        response.on('end', () => {
            
           console.log(responseData[0].Stock);
            if(responseData[0].Stock>0){
                const updatedStock = responseData[0].Stock - 1;
                const updatedData = { Stock: updatedStock }; // Assuming you're updating the stock

                axios.put('http://localhost:4000/update/' + req.params.item_number, updatedData)
                    .then((response) => {
                        console.log("Success");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
            else{
                console.log("This item is sold out");
            }
        });

   
});
//res.send('Purchase completed');
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});