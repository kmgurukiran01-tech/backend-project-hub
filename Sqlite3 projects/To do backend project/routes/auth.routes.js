const express=require('express')
const {registeUser,loginuser}=require("../controllers/auth.controller")



const router=express.Router()

router.post('/register',registeUser)
router.post('/login',loginuser)


module.exports=router;