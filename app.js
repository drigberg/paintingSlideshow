//-----Declarations & config
var express    	    = require("express"),
    app        	    = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    BlogPost        = require("./models/blogPost"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    port       	    = process.env.PORT || 5000;

//connect to database
var databaseUrl = "mongodb://admin-dan:admin@ds147789.mlab.com:47789/nerdsofazkaban";
mongoose.connect(databaseUrl);

const server = app.listen(port, function(err) {
    console.log("nerdsOfAzkaban blog server is running on port " + port);
});

//basic config
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", "./src/views");

//-----INDEX ROUTE
app.get("/", function (req, res) {
    res.render("index", {currentUser : req.user});
});

//-----SHOW
app.get("/blog-posts", function (req, res) {
    //for all blog posts
    BlogPost.find({}, function(err, blogPosts) {
        if (err) {
            console.log("Error with blog-post get: ", err);
        } else {
            res.json(blogPosts);
        };
    });
});

//-----NEW
app.post("/blog-posts", function (req, res, next) {
    //Without auth, searches for existing user with same username and creates
    //one if necessary; attaches user to next blog post
    User.findOne({"username": req.body.post.author }, function (err, foundUser) {
        if (err) {
            console.log("Error: ", error);
        } else {
            if (foundUser) {
                createBlogPost(req.body.post, foundUser, res);
            } else {
                var newUser = {username : req.body.post.author};
                User.create(newUser, function (err, newlyCreated) {
                    if (err) {
                        console.log("Error:", err);
                    } else {
                        console.log("Created user:", newlyCreated);
                        user = newlyCreated;
                        createBlogPost(req.body.post, user, res)
                    };
                });
            };
        };
    });
});

function createBlogPost(post, user, res){
    post.author = {id : user._id, username : user.username};
    BlogPost.create(post, function(err, newlyCreated){
        if(err){
            console.log("Error with blog-post creation: ", err);
        } else{
            console.log("New post:", newlyCreated)
            res.redirect("/");
        };
    });
}

//-----GET ALL USERS
app.get("/users", function (req, res) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users);
            res.json(users);
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
