var express = require('express');
var app = express()
require('dotenv').config()
var path= require('path')
require('ejs')
var apiRouter = require('./routes/Router');
const mongoose = require('mongoose');

var pw = process.env.PASSWORD//
var url = `mongodb+srv://root:${pw}@cluster0.u0si4.mongodb.net/mydb_deajeon?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
app.set('views', path.resolve(__dirname + '/views'))
app.set('view engine', 'ejs')


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

//routing파일 미들웨어 등록
app.use('/', apiRouter)

const port = process.env.PORT
app.listen(port, function(){
  console.log(`Server is Starting at http://localhost:${port}`);
})