let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Setting up port number
let portNumber = 4000
app.listen(portNumber, () => {
    console.log(`server listening on port ${portNumber}`)
})

// Jokes Data
let jokes = [
    {
        "error": false,
        "category": "Programming",
        "type": "single",
        "joke": "Algorithm: A word used by programmers when they don't want to explain how their code works.",
        "flags": {
            "nsfw": false,
            "religious": false,
            "political": false,
            "racist": false,
            "sexist": false,
            "explicit": false
        },
        "id": 1,
        "safe": true,
        "lang": "en"
    },
    {
        "error": false,
        "category": "Programming",
        "type": "single",
        "joke": "\"We messed up the keming again guys.\"",
        "flags": {
            "nsfw": false,
            "religious": false,
            "political": false,
            "racist": false,
            "sexist": false,
            "explicit": false
        },
        "id": 2,
        "safe": true,
        "lang": "en"
    }
]

// Get All Jokes Data
app.get('/getAllJokes', (request, response, next) => {
    if (jokes.length !== 0) {
        // console.log(jokes[0].id)
        response.send(jokes)
    } else {
        response.status(404).send({
            message: "Bad request. Data not found."
        })
    }
})

// Get Joke Data by ID
app.get('/getJokeById', (request, response, next) => {
    let passedID = request.query.passedIdData
    // console.log(passedID)
    let jokeData = {}

    for (let i = 0; i < jokes.length; i++) {
        // console.log(jokes[i].id)

        if (jokes[i].id == passedID) {
            jokeData = jokes[i]
            break
        } else {
            jokeData = null
        }
    }

    // console.log(jokeData)

    if (jokeData != null) {
        // console.log(jokeData)
        response.send(jokeData)
    } else {
        response.status(404).send({
            message: "Please check entered ID. Joke not found."
        })
    }
})

// Add Joke
app.post('/addJoke', (request, response, next) => {
    let data = request.body
    console.log(data)

    if (Object.keys(data).length === 0) {
        response.status(403).send({
            message: "There is no data to add. Please enter Data."
        })
    } else {
        jokes.push(data)
        response.send(data)
    }
})