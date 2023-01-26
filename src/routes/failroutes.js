const router = require('express').Router()
router.get('/registerFailure', (req, res) => {
    const error = req.flash('error')
    res.render('register', {isError:true, message:error[0]})
  })
  router.get('/failedLogin', (req, res) => {
    const error = req.flash('error')
  res.render('login', {isError:true, message:error[0]})
  })
  module.exports = router
