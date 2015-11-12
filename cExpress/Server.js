//Just a Tutorial
//https://www.codementor.io/nodejs/tutorial/build-website-from-scratch-using-expressjs-and-bootstrap

//Create your "express" object/variable/instance/thing
var express = require("express");
//Call a default constructor/object/variable/thing this should do express.createServer()
var app = express();
//Make a router object/variable/thing that behaves like an express router
var router = express.Router();
//Need to grab the path to our views //Get the current working directory and add the views folder
var path = __dirname + '/views/';

//further define our router request, result, next
router.use(function(req, res, next) {
    console.log("/" + req.method);
    //must pass next() so that the next router will get executed
    next();
});

//Route http requests for "/" aka default aka home to the index.html file
router.get("/", function(req,res) {
    res.sendFile(path + "index.html");
});

//Route http requests for "/about" to the appropriate view about.html
router.get("/about", function(req, res) {
    res.sendfile(path + "about.html");
});

//Route http request for "/contact" to the view contact.html
router.get("/contact", function(req,res) {
    res.sendfile(path + "contact.html");
});

//Tell express to use the routes that we have defined above.
app.use("/", router);

//Everything else "*" send to the 404.html page
app.use("*", function(req,res) {
    res.sendFile(path + "404.html");
});

//Time to create our http express listener
app.listen(3000,function(){
    console.log("Live at Port 3000");
});