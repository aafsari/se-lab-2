import {Router} from 'express'

const router = Router()

const users = [
    {id:1, username:'user1', email:'user1@gmail.com'},
    {id:3, username:'user3', email:'user3@gmail.com'},
    {id:2, username:'user2', email:'user2@gmail.com'}]

const friendships = [[1,2]]

router.get('/profile/:id/friends', (req, res, next) => {
    const {id} = req.params
    const user = users.find(u=>u.id === Number(id))
    console.log(user);
    if(!user){
        res.status(404).send("user not found")
    }else{
        const usersFriends = friendships
        .filter(f => f.includes(Number(id)))
        .map(f => f.filter(u => u!== Number(id)))
        res.json(usersFriends)
    }
})

router.post('/profile/:id/friends', (req, res, next) => {
    const {id} = req.params
    const {friend} = req.body
    const user = users.find(u=>u.id === Number(id))
    const friend = users.find(u=>u.id === Number(friend))
    console.log(user);
    if(!user || !friend){
        res.status(404).send("user not found")
    }else{
        const newFriendship = [user, friend]
        friendships.push(newFriendship)
        res.json(newFriendship)
    }
})

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



export default router