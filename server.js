//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "This is the secret",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/dist'));
require("./server/app.js")(app);
app.use(function(req, res) {
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// // server.js
// const express = require('express');
// const app = express();
// // Run the app by serving the static files
// // in the dist directory
// app.use(express.static(__dirname + '/dist'));
// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 8080);
