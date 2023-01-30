
import express from 'express'
import router from './src/router.js'
const app = express()
const port = 3000

app.use(router)

app.get('/', (req, res, next)=>{
    res.send("Server is Up")
})

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})
