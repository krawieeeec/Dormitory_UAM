var express = require('express');

var app = express();
app.use(express.bodyParser());
var adress = require('../models/dictionaries/type-adress.js').Adress;


app.get('/main', function (req, res) {
    res.send('Hello in UAM web app. It is alpha version');
})

app.get('/main/adress', function(req, res){
    adress.findById(1).then(adress => {
    res.send(JSON.stringify(adress));
})
})

app.get('/main/adress/create/:adress', function(req,res){
  /*
    const typeAdress = TypeAdress.build({
    Adress: req.params.adress
})
    typeAdress.save().then(() => {
    res.send('Adress was added');
})
*/
res.send(req.params);
});

app.post('/dawid', function(res, req){
    res.send('Dawid');
})






app.listen(3000);