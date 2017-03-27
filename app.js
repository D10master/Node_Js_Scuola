
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var studenti = require('./routes/studenti');
var voti = require('./routes/voti');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');studenti

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/studenti', studenti.list);
app.get('/studenti/add', studenti.add);
app.post('/studenti/add', studenti.save);
app.get('/studenti/delete/:id', studenti.delete_customer);
app.get('/studenti/edit/:id', studenti.edit);
app.post('/studenti/edit/:id',studenti.save_edit);
app.get('/voti/:id',voti.list);
app.get('/voti/add', voti.add);
app.post('/voti/add', voti.save);
app.get('/voti/delete/:id', voti.delete_customer);
app.get('/voti/edit/:id', voti.edit);
app.post('/voti/edit/:id',voti.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
