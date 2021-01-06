import * as express from 'express'

var app=express()

app.get("/",(_req, res)=>{ res.send("hello world!!!")})

app.listen(3000, ()=>{ console.log("listening at port 3000")})
