const getuserprofile=async(req,res)=>{
    try{
        const getquery=await req.app.locals.db.get(`
            select id,username,name from users where 
            id=?`,[req.userId]
        );

        if(!user){
           return res.status(404).json({
                Message:"user not found",
            })
        }

    }catch(erorr){
        res.status(500).json({
            Message:"server erorr",
        })
    }
}
module.exports=getuserprofile;