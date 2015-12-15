#!/usr/local/bin/node
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    var tmpTask = '';
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'truthordare',
        password : 'JackAndMark'
    });

    connection.connect();
    connection.query('SELECT taskContent from TruthGame.Tasks where TaskID=1', function(err, rows, fields) {
        connection.end(function(err) {console.log('connection ended')});
        if (err) throw err;
        tmpTask = rows[0].taskContent;
        res.render('index', { task: tmpTask });
    });
});

app.listen(3000);
