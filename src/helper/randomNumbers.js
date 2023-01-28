const fork = require('child_process')
function randomNumber(req, res) {
    let cant = req.params.cant || 100000000
    cant = parseInt(cant)
    fork(calculateRandom(cant))
    fork.on('result', (response) => res.render('random', {numbers:response}))
}

function calculateRandom(cant) {
    let response = []
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.trunc(Math.random() * 1000)
        response.push(randomNumber.toString())
    }
    fork.emit('response', response)
}

module.exports = randomNumber

