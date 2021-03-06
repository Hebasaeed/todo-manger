const jwt=require('jsonwebtoken')
const User=require('../models/user')
const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decode=jwt.verify(token,'node-course')
        console.log(decode)
        const user=await User.findOne({_id:decode._id,'tokens.token':token})
        console.log(user)
        if(!user){
            console.log('no user is found')
            throw new Error()
        }
        req.user=user
        req.token=token
        next()

    }
    catch(e){
        res.status(401).send({error:'please authenticateee'})
    }
}
module.exports=auth