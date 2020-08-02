"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var memeSchema = new mongoose_1.Schema({
    id: Number,
    author: String,
    description: String,
    imgUrl: String,
    liked: Boolean,
    created: Date,
    likedBy: Array,
});
module.exports = mongoose_1.model('Meme', memeSchema);
