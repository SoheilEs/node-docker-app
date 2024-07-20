const { Schema, model } = require("mongoose");


const postSchema = new Schema({
    title:{
        type: String,
        required: [true,"Post must have title"]
    },
    body:{
        type: String,
        required: [true,"Post must have body"]
    }
},{versionKey:false,timestamps:true})


const PostModel = model("Post",postSchema)

module.exports = PostModel