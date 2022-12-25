const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const{v4:uuidv4} = require("uuid"); //version 4 of uuid

const router = require('./router'); //for the router file

const port = process.env.PORT||5000;

app.set('view engine', 'ejs');// for ejs module..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// load static assets
// app.use(express.static("public")); //or the below one
// // app.use('/static',express.static(path.join(__dirname,'public')));
// app.use(express.static("assets"));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



// for session-express
app.use(session({
    // secret: 'secret', //'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbb4bed'
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router);




// home route
app.get('/',function(req,res){
    res.render("base",{title:'Login System'});
})




app.listen(5000, function(){
    console.log("server started on port 5000");
});