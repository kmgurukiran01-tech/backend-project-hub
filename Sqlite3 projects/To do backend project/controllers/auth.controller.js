const bcrypt=require('bcrypt')
const generateToken = require('../utils/jwt');

const registeUser=async (req,res)=>{
    const {username, password, name}=req.body

    
if(!username || !password|| !name){
    return res.status(400).json({
        message:"Username, password and name are required"
    })
}
try{
    const user=await req.app.locals.db.get(`select * from users where username = ?`,[username]);
    if(user){
        return res.status(400).json({
            message:"username already exists"
        })
    }
    const hashedpassword= await bcrypt.hash(password,10) 
    const  result=await req.app.locals.db.run(
        `INSERT INTO users (username, password, name)values (?, ?, ?)`,[username,hashedpassword,name]
    );
    res.status(201).json({
        message:'user registered successfully',
    userId:result.lastID,
})

}catch(error){
  res.status(500).json({
    message:"internal server error",
  });
 }
}

const loginuser=async(req,res)=>{
 const {username,password}=req.body
 if(!username || !password){
    return res.status(400).json({
        message:"username and password are required",
    })
 }

 try{
   const user=await req.app.locals.db.get(`select * from users where username=?`,[username])
   if(!user){
    return res.status(400).json({
        message:"invalid username or password",
    })
   }
   const ispasswordmatch=await bcrypt.compare(password,user.password)
   if(!ispasswordmatch){
    return res.status(400).json({
        message:"Invalid password",
    })
   }

   const token=generateToken(user.id)

   res.json({
    message:"login successfully!",
    token:token,
   });
 }catch(error){
      res.status(500).json({
    message:"internal server error",
  });
 }

 
}

module.exports={
    registeUser,loginuser
}


