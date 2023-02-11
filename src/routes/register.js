const router = require('express').Router()
const objectLogger = require('../configurations/log4js.config')
// const createUser = require('../controller/register')
const passport = require('passport')
router.get('/', (req, res) => {
    const error = req.flash('error')
    let isError = !(error[0] === undefined)
    objectLogger.info.debug(isError, error[0])
    res.render('register', {message:error[0], isError})
})
router.post('/', passport.authenticate('register', {failureRedirect:'/registerFailure', failureFlash:true, successRedirect:'/login'})) // createUser)

module.exports = router
