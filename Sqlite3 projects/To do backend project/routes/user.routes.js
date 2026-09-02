const express=require('express')

const {getuserprofile}=require('../controllers/user.controller');

const authenticateToken = require("../middleware/auth");
const router=express.Router()


router.get('/Profile',authenticateToken,getuserprofile)


module.exports=router;