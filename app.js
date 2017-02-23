//-----Declarations & config
var express    	    = require("express"),
    app        	    = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Painting        = require("./models/painting"),
    port       	    = process.env.PORT || 5000;

//connect to database
var databaseUrl = "mongodb://admin:admin@ds161059.mlab.com:61059/painting-models";
mongoose.connect(databaseUrl);

const server = app.listen(port, function(err) {
    console.log("painting slideshow server is running on port " + port);
});

//basic config
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", "./src/views");

//-----INDEX ROUTE
app.get("/", function (req, res) {
    res.render("index");
});

//-----SHOW
app.get("/paintings", function (req, res) {
    //for all blog posts
    Painting.find({}, function(err, paintings) {
        if (err) {
            console.log("Error with painting get: ", err);
        } else {
            res.json(paintings);
        };
    });
});

//-----NEW
app.post("/paintings", function (req, res, next) {
    Painting.create(req.body.painting, function(err, newlyCreated){
        if(err){
            console.log("Error with painting adding: ", err);
        } else{
            console.log("New painting:", newlyCreated)
            res.redirect("/");
        };
    });
});

//-------TEMPLATES
app.get("/templates/:template", function (req, res) {
    res.render("templates/" + req.params.template);
});


//-------SAFETY-NET REDIRECT
app.get("*", function (req, res) {
    res.redirect("/");
});
