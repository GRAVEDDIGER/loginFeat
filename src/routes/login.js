const router = require('express').Router()
// const createSession = require('../controller/login')
const passport = require('passport')
router.get('/', (req, res) => {
    const isError = !(req.flash('error')[0] === undefined)
    console.log(req.flash('error')[0])
    res.render('login', {isError, message:req.flash('error')[0]})
})
router.post('/', passport.authenticate('login', { failureRedirect: '/failedLogin', failureFlash:true, successRedirect:'/chat' }))

// router.post('/', passport.authenticate('login', {successRedirect:'/chat', failureRedirect:'/login', failureFlash:true}))

module.exports = router
