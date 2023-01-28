const getData = (req, res) => {
    req.session.reload(() => validarSession())
   function validarSession()  {
    let headerObj = {isLogged:false}
    console.log(req.session, req.passport, 'text')
        if ('passport' in req.session && 'user' in req.session.passport) {
            headerObj = {isLogged:true, name:' '}
        } else headerObj = {isLogged:false}
        res.render('chat', headerObj)
    }
}
module.exports = getData
