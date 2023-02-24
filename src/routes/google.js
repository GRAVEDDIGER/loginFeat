const router = require('express').Router()
const passport = require('passport')
router.get('/', passport.authenticate('google', {scope:['profile', 'email']}))
router.get('/callback', passport.authenticate('google', {failureRedirect:'/login', successRedirect:'/chat'}))
module.exports = router
