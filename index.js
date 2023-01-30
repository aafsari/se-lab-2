import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res, next)=>{
    res.send("Server is Up")
})

app.listen(port, ()=>{
    console.log("server is up");
})