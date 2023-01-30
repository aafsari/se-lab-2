import {Router} from 'express'

const router = Router()

router.get('/profile', (req, res, next) => {
    res.json({username:'user1', email:'user1@gmail.com'})
})

export default router