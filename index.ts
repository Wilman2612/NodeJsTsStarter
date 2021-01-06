import * as express from 'express'
import * as mongoose from 'mongoose'
require('dotenv').config()

var app=express()

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;        // seteamos el puerto
const dbCnn = process.env.MONGO ||  "mongodb://localhost:27017/test"

app.get("/",(_req, res)=>{ 
    mongoose.connect(dbCnn, {useNewUrlParser:true},(err)=>{
        if(err){
            res.status(500).send("Error de conexión a la bd: "+ err)
        }else{
            res.send("hello world!!!")
        }
    })
    
})

app.listen(port, ()=>{ console.log("listening at port 3000")})

process.on('SIGINT', function() {
    process.exit();
});