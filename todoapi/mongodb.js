const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
const connectionUrl='mongodb://127.0.0.1:27017'
const dbname='todo-manger'
    mongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('error has occurred')
    }
    console.log('success')
    const db=client.db(dbname)
    



    /////////////////////////////////////////////
    db.collection('todo').updateMany({},
    {
        $set:{completed:false}
    }).then((result)=>{
        console.log(result.modifiedCount)
    }).catch((error)=>{
        console.log(error)
    })


})
