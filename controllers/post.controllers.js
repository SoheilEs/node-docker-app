const PostModel = require("../models/postModel")


async function getAllPosts(req,res,next){
    try{
        const posts = await PostModel.find({})
        return res.status(200).json({
            statusCode: 200,
            results: posts?.length||0,
            data:{
                posts,
            }
        })
    }catch(err){
        next(err)
    }
}
async function getOnePost(req,res,next){
    try{
        const post = await PostModel.findById({_id:req.params.id})
        return res.status(200).json({
            statusCode: 200,
            data:{
                post,
            }
        })
    }catch(err){
        next(err)
    }
}
async function createPost(req,res,next){
    try{
        const post = await PostModel.create(req.body)
        return res.status(201).json({
            status: "Created",
            data:{
                post
            }
        })
    }catch(err){
        next(err)
    }
}
async function deletePost(req,res,next){
    try{
        const deleteResult = await PostModel.deleteOne({_id:req.params.id})
        if(!deleteResult.deletedCount) throw new Error("post dont deleted")
        return res.status(200).json({
            status: "Success",
            data:{
                message:"Post successfully"
            }
        })
    }catch(err){
        next(err)
    }
}
async function editPost (req,res,next){
    try{
        const post = await PostModel.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        return res.status(200).json({
            status: "success",
            data:{
                post,
            }
        })
    }catch(err){
        next(err)
    }
}


module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    editPost,
    getOnePost
}