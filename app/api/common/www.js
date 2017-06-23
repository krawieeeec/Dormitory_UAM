var express = require('express');

var server = express();

server.use('', require('../controllers/homeController.js'));
server.use('', require('../controllers/residentController.js'));


server.listen(3000, function(){
    console.log('Listening on 3000 port');
});