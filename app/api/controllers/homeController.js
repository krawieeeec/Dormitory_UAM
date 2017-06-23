var express = require('express');
var bodyParser = require('body-parser');
//var adress = require('../models/dictionaries/type-adress.js').Adress;

var router = express.Router();

router.get('/main', function (req, res) {
    res.send('<h1>Hello in UAM web app.</h1> <br>  ' + 
    'API list of end points: <br>' + 
    '<b>/main</b> - homeController<br>' +
    '<b>/resident</b> - residentController. Fetch all data from table "Residents".<br>' +
    '<b>/resident/:id</b> - Fetch data with specific id. </br>' +
    '<b>/resident/:id/delete</b> - Delete resident with specific id.');
})

/*
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


app.listen(3000);
*/

module.exports = router;