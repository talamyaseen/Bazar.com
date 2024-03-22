const express = require('express');
const http =require('http');
const axios = require('axios');
const app = express();
const port= 3000;

app.get('/search/:topic',(req,res)=>{
    http.get('http://localhost:4000/search/'+req.params.topic,( response)=>{
        response.on("data", (chunk)=>{
            const responseData = JSON.parse(chunk);
            res.json(responseData)
        });     
})
})
app.get('/info/:item_number',(req,res)=>{
    http.get('http://localhost:4000/info/'+req.params.item_number,(response)=>{
        response.on("data", (chunk)=>{
            const responseData = JSON.parse(chunk);
            res.json(responseData)
        });
})
})
app.post('/purchase/:item_number', async (req,res)=>{
    try {
        const response = await axios.post(`http://localhost:5000/purchase/${req.params.item_number}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 
})
app.listen(port,()=>{  
    console.log("Front end server is running at 3000");
})
