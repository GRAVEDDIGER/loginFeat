const getData = (req, res) => {
    req.session.reload(() => validarSession())
   function validarSession()  {
    let headerObj = {isLogged:false}
    console.log(req.session, req.passport, 'text')
        if (req.session.passport.user !== undefined) {
            headerObj = {isLogged:true, name:' '}
        } else headerObj = {isLogged:false}
        res.render('chat', headerObj)
    }
}
module.exports = getData
