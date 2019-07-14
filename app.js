const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const user=require('./routes/user.js');

var app=express();
app.listen(8080);

app.use(express.static('programme'));
app.use(bodyParser.urlencoded({
	extended:false
}))

app.use('/user',user);



