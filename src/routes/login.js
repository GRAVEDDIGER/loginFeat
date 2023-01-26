const router = require('express').Router()
// const createSession = require('../controller/login')
 const passport = require('passport')
router.get('/', (req, res) => {
    const error = req.flash('error')
    const isError = !(error[0] === undefined)
    res.render('login', {isError, message:error[0]})
})
router.post('/', passport.authenticate('login',
    {failureRedirect: '/failedLogin',
    successRedirect:'/chat',
    failureFlash:true}))

module.exports = router
