const { getAllPosts, createPost, deletePost, editPost,getOnePost } = require("../controllers/post.controllers")

const router = require("express").Router()


router.get("/",getAllPosts)
router.get("/:id",getOnePost)
router.post("/create",createPost)
router.delete("/delete/:id",deletePost)
router.patch("/edit/:id",editPost)

module.exports = router

