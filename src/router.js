import {Router} from 'express'

const router = Router()

const users = [
    {id:1, username:'user1', email:'user1@gmail.com'},
    {id:2, username:'user2', email:'user2@gmail.com'}]

router.get('/profile/:id', (req, res, next) => {
    const {id} = req.params
    const user = users.find(u=>u.id===Number(id))
    console.log(user);
    if(!user){
        res.status(404).send("user not found")
    }else{
        res.json(user)
    }
})

export default router