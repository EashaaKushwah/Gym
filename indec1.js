const express = require("express");
const app = express();
var bodyParser=require('body-parser');
var urlEncodedParser=bodyParser.urlencoded({extended:false});
const path = require("path");
var MongoClient =require('mongodb').MongoClient;
app.use(express.static(path.join(__dirname ,"public")));
/*
app.get("/", function(req, res){
 res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/signup.html", function(req, res){
 res.sendFile(__dirname+"/"+ "signup.html");
});
app.get("/login.html", function(req, res){
 res.sendFile(__dirname+"/"+ "login.html");
});
*/
app.post("/signup",urlEncodedParser,function(req, res) {
 signupDetails = {
 name: req.body.uname,
 email: req.body.email,
 password: req.body.psw
 };

 MongoClient.connect('mongodb://localhost:27017', function(err,db){
 if (err) throw err;
 console.log("Connected to db");
 var dbo=db.db('gym');
 dbo.collection('users').insertOne(signupDetails, function(err, respons
e){
 if (err) {
 res.redirect("/notFound");
 } else {
 res.redirect("/success");
 }
 });
 db.close();
 });
});
app.get("/notFound", function(req, res){
 res.sendFile(path.join(__dirname, "public", "notfound.html"));
});
app.get("/success", function(req, res){
 res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.post("/login",urlEncodedParser, function(req, res){
 loginDetails = {
 email: req.body.email,
 password: req.body.psw
 };
 MongoClient.connect('mongodb://localhost:27017', function(err,db){
 if (err) throw err;
 console.log("Connected to db");
 var dbo=db.db('gym');
 dbo.collection('users').find(loginDetails).toArray( function(err, resp
onse){
 if (err) throw err;
 else {
 if (Object.entries(res).length==0)
 res.redirect("/notFound");
 else
 res.redirect("/successLogin");
 }
 });
 db.close();
 });
});
app.get("/successLogin", function(req, res){
 res.sendFile(path.join(__dirname, "public", "success.html"));
});
app.post("/contact",urlEncodedParser,function(req, res) {
 contactDetails = {
 name: req.body.uname,
 email: req.body.email,
 phone: req.body.phone,
 query: req.body.query
 };

 MongoClient.connect('mongodb://localhost:27017', function(err,db){
 if (err) throw err;
 console.log("Connected to db");
 var dbo=db.db('gym');
 dbo.collection('queries').insertOne(contactDetails, function(err, resp
onse){
 if (err) {
 throw err;
 } else {
 res.redirect("/");
 }
 });
 db.close();
 });
});
var server = app.listen(8080, function () {
 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s/", host,port);
})
