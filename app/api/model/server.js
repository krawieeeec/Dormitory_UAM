var express = require('express');

var app = express();
const pool = require('../../../db');

app.get('/', function (req, res) {
    res.send('Hello World!');
    
    pool.query('CREATE DATABASE mydb', function(err,res){
        if(err) {
            return pool.query('DROP DATABASE mydb', function(){
                console.log('usunięto bazę');
            });
        };
        console.log('utworzono bazę');
    })
    /*
    pool.query('SELECT $1::int AS number', ['2'], function(err, res) {
  if(err) {
    return console.error('error running query', err);
  }

  console.log('number:', res.rows[0].number);
});
*/
})

app.listen(3000);