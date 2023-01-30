import {Router} from 'express'

const router = Router()

const users = [
    {id:1, username:'user1', email:'user1@gmail.com'},
    {id:3, username:'user3', email:'user3@gmail.com'},
    {id:2, username:'user2', email:'user2@gmail.com'}
]
const notes = [
    {author:1, content:"simple note", attachment:null },
    {author:1, content:"simple note", attachment:null }
]
const friendships = [[1,2]]

const friendsList = (user)=> friendships.filter(f => f.includes(user)).map(f => f.filter(u => u!== user)).flat()


router.get('/profile/:id/notes', (req, res, next) => {
    const {id} = req.params
    const usersNotes = notes.find(n=>n.author === Number(id))
    console.log(usersNotes);
    res.json(usersNotes)
})


router.post('/profile/:id/notes', (req, res, next) => {
    const {id} = req.params
    const {content} = req.body
    const user = users.find(u=>u.id === Number(id))
    if(!user){
        res.status(404).send("user not found")
    }else{
        const newNote = {author:id, content}
        notes.push(newNote)
        res.json(newNote)
    }
})


router.get('/profile/:id/friends', (req, res, next) => {
    const {id} = req.params
    const user = users.find(u=>u.id === Number(id))
    console.log(user);
    if(!user){
        res.status(404).send("user not found")
    }else{
        const usersFriends = friendsList(Number(id))
        res.json(usersFriends)
    }
})

router.post('/profile/:id/friends', (req, res, next) => {
    const {id} = req.params
    const {friendId} = req.body
    const user = users.find(u=>u.id === Number(id))
    const friend = users.find(u=>u.id === Number(friendId))
    console.log(user);
    if(!user || !friend){
        res.status(404).send("user not found")
        return
    }
    if(id === friendId){
        res.status(401).send("invalid action")
        return 
    }if(friendsList(user.id).includes(friend.id)){
        res.status(401).send("already a friend")
        return
    }else{
        const newFriendship = [user.id, friend.id]
        friendships.push(newFriendship)
        res.json(newFriendship)
    }
})

router.post('/profile', (req, res, next) => {
    const {username, email} = req.body
    const id = users.length + 1
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



export default router
