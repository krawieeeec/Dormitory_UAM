var express = require('express');
var bodyParser = require('body-parser');
var adress = require('../models/dictionaries/type-adress.js').Adress;

var app = express();

app.get('/main', function (req, res) {
    res.send('Hello in UAM web app. It is alpha version');
})

app.get('/main/adress', function(req, res){
    adress.findAll().then(adress => {
    res.send(JSON.stringify(adress));
})
})

app.get('/main/adress/create/:adress', function(req,res){
    
    const typeAdress = adress.build({
    Adress: req.params.adress 
});

    typeAdress.save().then(() => {
        res.setHeader('Content-Type', 'text/html');
        res.status(200);
    res.send('Adress was added. Parameter from URL' + req.params.adress);
}).catch(error => {
    res.send('Upss, we encounter problem: ' + error);
})
});

/*
app.post('/dawid', function(res, req){
    res.send('Dawid');
})
*/








app.listen(3000);