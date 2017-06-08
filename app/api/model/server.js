var express = require('express');

var app = express();
const pool = require('../../../db');

app.get('/', function (req, res) {
    res.send('Hello World!');

    pool.query('CREATE DATABASE mydb', function(err,res){
        if(err) {
             pool.query('DROP DATABASE mydb', function(){
                console.log('usunięto bazę');
            });
        };
        console.log('utworzono bazę');
    });
})

app.listen(3000);