const router = require('express').Router()
const objectLogger = require('../configurations/log4js.config')
router.get('/updateFailure', (req, res) => {
 objectLogger.error.error(req.flash('error'))
 res.send('Fallo')
 })
router.get('/registerFailure', (req, res) => {
    const error = req.flash('error')
    objectLogger.error.error(error)
    res.render('register', {isError:true, message:error[0]})
  })
  router.get('/failedLogin', (req, res) => {
    const error = req.flash('error')
  res.render('login', {isError:true, message:error[0]})
  })

module.exports = router
