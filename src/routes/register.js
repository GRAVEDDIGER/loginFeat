const router = require('express').Router()
// const createUser = require('../controller/register')
const passport = require('passport')
router.get('/', (req, res) => {
    let isError = !(req.flash('error')[0] === undefined)
    console.log(isError, req.flash('message')[0])
    res.render('register', {message:req.flash('error')[0], isError})
})
router.post('/', passport.authenticate('register', {failureRedirect:'/registerFailure', failureFlash:true, successRedirect:'/login'})) // createUser)

module.exports = router
