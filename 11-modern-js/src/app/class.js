/*
function Animal(name) {
    this.name = name
    this.kind = 'mammal'
    this.walk = function() {
        console.log('walking')
    }
}

function Dog(name) {
    Animal.call(this, name)

    this.bark = function() {
        console.log('barking')
    }
}

Dog.prototype = new Animal()
*/

class Animal {
    constructor(name) {
        this.name = name
        this.kind = 'mammal'
    }

    walk() {
        console.log('walking')
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name)
    }

    bark() {
        console.log('barking')
    }
}
