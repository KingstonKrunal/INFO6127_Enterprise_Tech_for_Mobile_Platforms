let express = require('express')
let bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// console.log("Hello World")

let portNumber = 4000
app.listen(portNumber, () => {
    console.log(`server listening on port ${portNumber}`)
})

// get data - test
app.get('/test', (request, response, next) => {
    response.send({
        hello: 'world'
    })
})

let numbers = {}
numbers[1] = 'one'
numbers[2] = 'two'
numbers[3] = 'three'

// get data
app.get('/numberString', (request, response, next) => {
    let number = request.query.number
    let numberString = numbers[number]

    if (numberString) {
        let data = {}
        data[number] = numberString

        response.send(data)
    } else {
        response.status(404).send({
            message: "Bad number. Please enter number 1-3"
        })
    }
})

// add data
app.post('/addNumber', (request, response, next) => {
    let data = request.body
    console.log(data)

    if (!data) {
        response.status(403).send({
            message: "There is no data to add."
        })
    } else {
        numbers[data.number] = data.value

        let responseData = {}
        responseData[data.number] = numbers[data.number]

        response.send(responseData)
    }
})