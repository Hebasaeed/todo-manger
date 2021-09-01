const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const auth=require('../middleware/auth')





////signup////////////reqister the new user
router.post('/users',async(req,res)=>{
    const userin=new User(req.body)
    try{
        await userin.save()
        const token=await userin.generateToken()
        res.status(200).send({userin,token})
    }catch(e){
        res.status(400).send('error:::',e)
    }
})


///////////////////////login///////////////
router.post('/users/login',auth,async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        ///
        const token=await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.send('try agin'+e)
    }

})
/////////////////logout////////////know from header,put it one from tokens of target object to do it the operation
router.delete('users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((el)=>{
            return el.token !==req.token})
            await req.user.save()
            res.send('log out success')
    }
    catch(e){
        res.send("error  "+e)

    }
})









module.exports=router