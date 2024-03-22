const express = require('express');
const http =require('http');
const DatabaseConfig = require('./DatabaseConfig');
const app = express();
const port= 4000;
app.get('/search/:topic',(req,res)=>{
    DatabaseConfig.searchTopic(req.params.topic, (err, data) => {
        if (err) {
            res.status(500).send('Error fetching data from database');
        } else {
            res.json(data);
        }
    });
})

app.get('/info/:item_number',(req,res)=>{
    DatabaseConfig.info(req.params.item_number, (err, data) => {
        if (err) {
            res.status(500).send('Error fetching data from database');
        } else {
            res.json(data);
        }
    });
})

app.put('/update/:item_number/',(req,res)=>{
    DatabaseConfig.updateStock(req.params.stock,req.params.item_number)
})

app.listen(port,()=>{  
    console.log("Catalog server is running at 4000");
})
