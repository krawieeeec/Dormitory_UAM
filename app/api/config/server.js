var express = require('express');
var routes = require('./routes.js');
var server = express();

server.use('', routes);
server.enable('trust proxy');
server.listen(3000, function(){
    console.log('Listening on 3000 port');
});