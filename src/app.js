const express = require('express')

const app = express()



app.get("/user", (req,res)=>{
    res.send("User info.....")
})

app.post("/user", (req,res)=>{
    res.send("Usrer created successfully")
})

app.delete("/user", (req,res)=>{
    res.send("User deleted successfully")
})

app.patch("/user", (req,res)=>{
    res.send("User updated successfully")
})

// app.use("/", (req,res)=>{
//     res.send("Hello Worlds! This is my first express server...")
// })

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})


