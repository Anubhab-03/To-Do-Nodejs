var express = require('express');
var app = express();
var todocontroller = require('./controllers/controller.js');


app.set('view engine','ejs');
//set up template
app.use(express.static('./public'));

//fire the controller
todocontroller(app);
//listening to port
app.listen(3000);
console.log("Listening"); 
