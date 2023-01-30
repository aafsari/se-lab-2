import {Router} from 'express'

const router = Router()

const users = [
    {id:1, username:'user1', email:'user1@gmail.com'},
    {id:2, username:'user2', email:'user2@gmail.com'}
]


const notes = [
    {author:1, content:"simple note", attachment:null },
    {author:1, content:"simple note", attachment:null }
]


router.post('/profile', (req, res, next) => {
    const {username, email} = req.body
    const id = users.length
    const newUser = {id, username, email}
    console.log(newUser);
    users.push(newUser)
    res.json(newUser)
})

router.put('/profile/:id', (req, res, next) => {
    const {id} = req.params
    const {username, email} = req.body
    const currentIndex = users.findIndex(u=>u.id === Number(id))
    users.splice(currentIndex, 1)
    const newUser = {id, username, email}
    console.log(newUser);
    users.push(newUser)
    res.json(newUser)
})

router.get('/profile/:id', (req, res, next) => {
    const {id} = req.params
    const user = users.find(u=>u.id === Number(id))
    console.log(user);
    if(!user){
        res.status(404).send("user not found")
    }else{
        res.json(user)
    }
})

router.get('/notes/:id', (req, res, next) => {
    const {id} = req.params
    const usersNotes = notes.find(n=>n.author === Number(id))
    console.log(usersNotes);
    res.json(usersNotes)
})



export default router