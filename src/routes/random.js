const router = require('express').Router()
const {fork} = require('child_process')

router.get('/:cant', (req, res) => {
    const randomChild = fork('./src/helper/randomNumbers.js')
    randomChild.send(parseInt(req.params.cant))
    randomChild.on('message', (numbers) => {
        res.send(numbers)
    })
})

router.get('/', (req, res) => {
    const randomChild = fork('./src/helper/randomNumbers.js')
    randomChild.send(100000000)
    randomChild.on('message', (numbers) => {
        res.send(numbers)
    })
})

module.exports = router
