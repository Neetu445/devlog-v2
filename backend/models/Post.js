const mongoose = require("mongoose");

const postSchema =new mongoose.Schema({

    userId: String,
    
    title:String,
    whatIDid: [String],
    learned: [String],
    problems: [String],
    solutions: [String],
    output: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);