#!/usr/local/bin/node
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/', function(req, res) {
//    var tmpTask = '';
//    var connection = mysql.createConnection({
//        host     : 'localhost',
//        user     : 'truthordare',
//        password : 'JackAndMark'
//    });
//
//    connection.connect();
//    connection.query('SELECT Content from TruthGame.Dare where TaskID=45;', function(err, rows, fields) {
//        connection.end(function(err) {console.log('connection ended')});
//        if (err) throw err;
//        tmpTask = rows[0].Content;
//        console.log(rows[0].Content);
//        console.log(tmpTask);
//        res.render('index', { content: tmpTask });
//    });
//});

app.post('/getTask', function(req, res) {
    var queryType = 0;
    var mysqlQuery = '';

    if(req.body.qType == 'btn_truth') {
        queryType = 'Truth';
    } else {
        queryType = 'Dare';
    }
    mysqlQuery = 'SELECT Content from TruthGame.' + queryType + ' ORDER BY RAND() LIMIT 1;'
    console.log(mysqlQuery);
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'truthordare',
        password : 'JackAndMark'
    });

    connection.connect();
    connection.query(mysqlQuery, function(err, rows, fields) {
        connection.end(function(err) {console.log('connection ended')});
        if (err) throw err;
        console.log(rows[0].Content);
        res.write(rows[0].Content);
        res.end();
    });
});

app.listen(3000);
