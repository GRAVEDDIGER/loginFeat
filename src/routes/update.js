const router = require('express').Router()
const passport = require('passport')

router.post('/', passport.authenticate('update', {failureRedirect:'/updateFailure', failureFlash:true}), (req, res) => res.send('texto')) // createUser)
router.get('/', (req, res) => {
    res.render('update')
})
module.exports = router
