const  express=require('express')
const userRouter=require('./routers/user')

const todoRouter=require('./routers/todo')

require('./db/mongoose')
const app=express()
app.use(express.json())
app.use(userRouter)

app.use(todoRouter)

const port=3000

app.listen(port,()=>{console.log('server is running')})