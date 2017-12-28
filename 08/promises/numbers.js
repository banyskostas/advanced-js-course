var readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
})

var number = Math.floor(Math.random() * 100)

function readlineOnce(done) {
    rl.once('line', done)
}

function readLinePromise() {
    return new Promise(function(resolve) {
        readlineOnce(resolve)
        /*
        readlineOnce(function(line) {
            resolve(line)
        })*/
    })
}

function processGuess() {
    return readLinePromise()
        .then(function(line) {
            var guess = parseInt(line)
            if (isNaN(guess)) {
                throw new Error('Not a number')
            }
            return guess
        }).then(function(guess) {
            return guess - number
        })
}

console.log('Guess the number')

function guessingGame() {
    return processGuess()
        .then(function(result) {
            if (result > 0) {
                console.log('Your guess is too big')
                return guessingGame()
            } else if (result < 0) {
                console.log('Your guess is too small')
                return guessingGame()
            } else {
                console.log('Correct')
                return true
            }
        }).catch(function(error) {
            console.log(error.message)
        })
}

guessingGame()
    .then(function() {
        rl.close()
    })


/*
var promise = new Promise(function (resolve, reject) {
})
*/
