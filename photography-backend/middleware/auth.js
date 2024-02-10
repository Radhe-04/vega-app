const jwt=require('jsonwebtoken')
const User=require('../models/user')

const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'asdfghjkl')
        const user=await User.findOne({_id:decoded._id})
        if(!user){
            throw new Error()
        }
        if(user.token !== token){
            throw new Error();
        }
        req.token=token;
        req.user=user;
        next()
    }catch(e){
        res.status(401).send({error:"Please Authenticate"})
    }

}
module.exports=auth
