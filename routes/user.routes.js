const { getAllUsers,register,login,getOneUser } = require("../controllers/user.controllers")

const router = require("express").Router()


router.get("/",getAllUsers)
router.get("/:id",getOneUser)
router.post("/register",register)
router.post("/login",login)


module.exports = router