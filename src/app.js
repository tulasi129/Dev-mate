const express = require('express')

const app = express()

app.use("/", (req,res)=>{
    res.send("Hello Worlds! This is my first express server.")
})

app.use("/test", (req,res)=>{
    res.send("Welcome to the devMate server")
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})