const postRoutes = require("./post.routes")
const userRoutes = require("./user.routes")
const router = require("express").Router()


router.use("/post",postRoutes)
router.use("/auth",userRoutes)


module.exports = router