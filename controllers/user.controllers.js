const UserModel = require("../models/user.model")

UserModel


async function getAllUsers(req,res,next){
    try{
        const users = await UserModel.find({})
        return res.status(200).json({
            statusCode: 200,
            results: users?.length||0,
            data:{
                users,
            }
        })
    }catch(err){
        next(err)
    }
}
async function getOneUser(req,res,next){
    try{
        const user = await UserModel.findById({_id:req.params.id})
        return res.status(200).json({
            statusCode: 200,
            data:{
                user,
            }
        })
    }catch(err){
        next(err)
    }
}
async function register(req,res,next){
    try{
        const user = await UserModel.create(req.body)
        return res.status(201).json({
            status: "Created",
            data:{
                user
            }
        })
    }catch(err){
        next(err)
    }
}
async function login(req,res,next){
    try{
        const user = await UserModel.findOne({username:req.body.username,password:req.body.password})
        if(!user)throw new Error("User dosen't exsist")
        req.session.user = user
        
        return res.status(200).json({
            status: "Success",
            data:{
                message:"you are logged in successfully"
            }
        })
    }catch(err){
        next(err)
    }
}



module.exports = {
    getAllUsers,
    getOneUser,
    register,
    login,
}