const express=require('express')
const router=new express.Router()
const Todo=require('../models/todo')
const auth=require('../middleware/auth')


router.post('/todos',auth,async(req,res)=>{
    const todoin=new Todo({...req.body,createdBy:req.user._id})
    try{
   await todoin.save()
        res.status(200).send(todoin)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/todos',auth,async(req,res)=>{
    try{
    await req.user.populate('todo').execPopulate()  ////  todo is name of file in robot
        res.send(req.user.todo)
    }
catch(e){
        res.status(400).send(e)
    }
})
////////////////////get by id////////////////

router.get('/todos/:id',auth,async(req,res)=>{
    

    const _id=req.params.id
    try{const todo= Todo.findOne({_id,createdBy:req.user._id})
        if(!todo){
            return res.status(404).send('unable to find todo')
        }
        res.status(200).send(todo)
    }catch(e){
        res.status(500).send('unable to connect to data'+e)
    }
})

/////////////delete/////////////////
       

router.delete('/todos/:id',auth,async(req,res)=>{
    const _id=req.params.id
      try{
          const todo=await Todo.findOneAndDelete({_id,createdBy:req.user._id})
          if(!todo){
              return res.send('unable to find todo')
          }
          res.send(todo)
      }
      catch(e){
          res.send(e)
      }
          
      
  })
///////////////patch=update/////////////////////

router.patch('/todos/:id',async(req,res)=>{
    const updates=Object.keys(req.body)  
    console.log(updates)
    const _id=req.params.id;
      try{
          
          const todo=await Todo.findOne({_id,createdBy:req.user._id})

          if(!todo){
            return res.status(400).send('unable to find todo')
        }
        
        
          updates.forEach((update)=>todo[update]=req.body[update])
              await todo.save()
              res.send(todo)
          
         
      }
      catch(e){
          res.status(400).send('unable to connecttttt to data   '+e)
      }
           
  })
///////////////////




module.exports=router