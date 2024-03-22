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

app.get('/purchase/:item_number', (req, res) => {
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
