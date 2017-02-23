var mongoose = require("mongoose");

var BlogPostSchema = new mongoose.Schema({
    title : String,
    topic : String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    summary : String,
    created : { type: Date, default: Date.now },
    thumbnail : String,
    text : String
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
