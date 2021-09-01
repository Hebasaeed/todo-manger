const mongoose=require('mongoose')


const todoSchema=new mongoose.Schema({
    
        title:{
            type:String,
            required:true,
        trim:true
        },
        completed:{
            type:Boolean,
            default:false
            
            },
         createdBy:{
             type:mongoose.Schema.Types.ObjectId,
             required:true
         },
         createdat:{
             type:Date
         }  
        
})




 
const Todo=mongoose.model('Todo',todoSchema)
module.exports=Todo