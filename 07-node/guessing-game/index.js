var readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
})

var number = Math.floor(Math.random() * 100)

function readlineOnce(done) {
    rl.once('line', done)
}

/*
console.log('Guess the number:')

function kaipnors() {
    readlineOnce(function(line) {
        var guess = parseInt(line)
        var guessed = false
        if (isNaN(guess)) {
            console.log('Not a number')
        } else if (guess > number) {
            console.log('Your guess is too big')
        } else if (guess < number) {
            console.log('Your guess is too small')
        } else {
            guessed = true
            console.log('Correct')
            rl.close()
        }

        if (!guessed) {
            kaipnors()
        }
    })
}

kaipnors()*/

// pizza or burger?
// pizza -> pepperoni, hawaii, margaritta?
// burger -> cheese or no cheese?
// stay or takeaway?
// burger -> Thank you. Your order for a burger [with cheese] will be processed. Delivery type: [stay/takeaway]
// pizza -> Thank you. Your order for a [pizza type] pizza will be processed. Delivery type: [stay/takeaway]

// pizza or burger?
// -kebabai
// sorry, the dish is not found
// pizza or burger?
//

/*
function readDish() {
    console.log('pizza or burger?')
    readlineOnce(function (dish) {
        if (dish == 'pizza') {
            console.log('pepperoni, hawaii, margaritta?')
            readlineOnce(function (pizzaType) {
                console.log('stay or takeaway?')
                readlineOnce(function (deliveryType) {
                    console.log('Thank you. Your order for a ' + pizzaType + ' pizza will be processed. Delivery type: ' + deliveryType)
                    rl.close()
                })
            })
        } else if (dish === 'burger') {
            console.log('cheese or no cheese?')
            readlineOnce(function(burgerType) {
                console.log('stay or takeaway?')
                readlineOnce(function (deliveryType) {
                    console.log('Thank you. Your order for a burger ' + (burgerType === 'cheese' ? ' with cheese' : '') + ' will be processed. Delivery type: ' + deliveryType)
                    rl.close()
                })
            })
        } else {
            console.log('Sorry the dish was not found')
            readDish()
        }
    })
}

readDish()*/

function readDish(dishCallback) {
    console.log('pizza or burger?')
    readlineOnce(function (dish) {
        dishCallback(dish)
    })
}

function readPizzaType(pizzaTypeCallback) {
    console.log('pepperoni, hawaii, margaritta?')
    readlineOnce(function (pizzaType) {
        pizzaTypeCallback(pizzaType)
    })
}

function readDeliveryType(deliveryTypeCallback) {
    console.log('stay or takeaway?')
    readlineOnce(function (deliveryType) {
        deliveryTypeCallback(deliveryType)
    })
}

function readBurgerType(burgerTypeCallback) {
    console.log('cheese or no cheese?')
    readlineOnce(function(burgerType) {
        burgerTypeCallback(burgerType)
    })
}
/*
readDish(function (dish) {
    if (dish == 'pizza') {
        readPizzaType(function(pizzaType) {
            readDeliveryType(function(deliveryType) {
                console.log('Thank you. Your order for a ' + pizzaType + ' pizza will be processed. Delivery type: ' + deliveryType)
                rl.close()
            })
        })
    } else if (dish === 'burger') {
        readBurgerType(function(burgerType) {
            readDeliveryType(function(deliveryType) {
                console.log('Thank you. Your order for a burger ' + (burgerType === 'cheese' ? ' with cheese' : '') + ' will be processed. Delivery type: ' + deliveryType)
                rl.close()
            })

        })
    } else {
        console.log('Sorry the dish was not found')
        readDish()
    }
})
*/

rl.close()

/*
console.log(3)
setTimeout(function() {
    console.log(2)
    setTimeout(function() {
        console.log(1)
        setTimeout(function() {
            console.log('bum')
        }, 1000)
    }, 1000)
}, 1000)*/

/*
console.log(3)
setTimeout(function() {
    console.log(2)
}, 1000)
setTimeout(function() {
    console.log(1)
}, 2000)
setTimeout(function() {
    console.log('bum')
}, 3000)*/

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve()
        }, time)
    })
}

/*
console.log(3)
delay(1000)
    .then(function() {
        console.log(2)
        delay(1000)
            .then(function() {
                console.log(1)
                delay(1000)
                    .then(function() {
                        console.log('bum')
                    })
            })
    })*/

/*
var resolvedPromise = new Promise(function(resolve) {
    console.log('promise function')
    setTimeout(function() {
        resolve('labas')
    }, 1000)
})

resolvedPromise.then(function(x) {
    console.log(x)
    return 'irgi labas'
}).then(function(x) {
    console.log(x)
}).then(function() {
    return new Promise(function(resolve) {
        resolve('dar vienas labas')
    })
}).then(function(x) {
    console.log(x)
})*/

/*
console.log(3)
delay(1000)
    .then(function() {
        console.log(2)
        return delay(1000)
    })
    .then(function() {
        console.log(1)
        return delay(1000)
    })
    .then(function() {
        console.log('bum')
    })*/

function readLinePromise() {
    return new Promise(function(resolve) {
        readlineOnce(resolve)
        /*
        readlineOnce(function(line) {
            resolve(line)
        })*/
    })
}

console.log('pizza or burger?')
readLinePromise()
    .then(function(dish) {
        if (dish == 'pizza') {
            console.log('pepperoni, hawaii, margaritta?')
            return readLinePromise()
                .then(function(pizzaType) {
                    return {
                        dish: dish,
                        type: pizzaType,
                    }
                })
        } else {
            console.log('cheese or no cheese?')
            return readLinePromise()
                .then(function(burgerType) {
                    return {
                        dish: dish,
                        type: burgerType,
                    }
                })
        }
    })
    .then(function(params) {
        console.log('stay or takeaway?')
        return readLinePromise()
            .then(function(deliveryType) {
                return {
                    dish: params.dish,
                    type: params.type,
                    deliveryType: deliveryType
                }
            })
    }).then(function (order) {
        if (order.type == 'pizza') {
            console.log('Thank you. Your order for a ' + order.type + ' pizza will be processed. Delivery type: ' + order.deliveryType)
        } else {
            console.log('Thank you. Your order for a burger ' + (order.type === 'cheese' ? ' with cheese' : '') + ' will be processed. Delivery type: ' + .order.deliveryType)

        }
    }).then(function() {
        rl.close()
    })
