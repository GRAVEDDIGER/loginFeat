process.on('message', (cantidad) => {
    let response = []
    const cant = parseInt(cantidad)
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.trunc(Math.random() * 1000)
        response.push(randomNumber.toString())
    }
process.send(response)
})
