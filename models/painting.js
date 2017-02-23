var mongoose = require("mongoose");

var PaintingSchema = new mongoose.Schema({
    artist : String,
    url : String,
    notes : String,
    created : { type: Date, default: Date.now }
});

module.exports = mongoose.model("Painting", PaintingSchema);
