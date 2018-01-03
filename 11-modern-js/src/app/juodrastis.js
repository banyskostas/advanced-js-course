var x = 1
const y = 2
let z = 3

// y = 7 - klaida

const kazkas = {
    a : 1
}

kazkas.a = 2

const masyvas = [1, 2, 4, 6, 23]

const lyginiai = masyvas.filter(function(el) {
    return el % 2 === 0
})

const lyginiai2 = masyvas.filter(el => el % 2 === 0)

const a = () => console.log('foo')
const b = (a, b) => console.log(a, b)

const c = () => {
    console.log('vienas sakinys')
    return 'antras sakinys'
}

const vardas = 'Juozas'
const amzius = 23

console.log(vardas + ' yra ' + amzius + ' metu')
console.log(`${vardas.toUpperCase()} 
    yra ${amzius} metu`)

console.log([ 1, 2, 3, ...masyvas ])

const person1 = {
    name: 'Juozas',
    age: 23
}

/*
const person2 = {
    ...person1,
    age: 24
}*/

const settingDefaults = {
    startDayOfWeek: 'Monday',
    lang: 'en',
    maxDate: new Date()
}

const passedInSettings = {
    startDayOfWeek: 'Sunday',
    lang: 'lt'
}


// const actualSettings = { ...settingDefaults, ...passedInSettings }
/*
 * const actualSettings = {}
 * actualSettings.startDayOfWeek = settingDefaults.startDayOfWeek
 * actualSettings.lang = settingDefaults.lang
 * actualSettings.maxDate = settingDefaults.maxDate
 *
 * actualSettings.startDayOfWeek = passedInSettings.startDayOfWeek
 * actualSettings.lang = passedInSettings.lang
 *
 */
//const defaultSettingsCopy = { ...settingDefaults }

function add(a, b) {
    return a + b
}

const skaiciai = [5, 7]
//console.log(add(...skaiciai))

const { name, age } = person2
console.log(name)
console.log(age)

const [pirmas, antras] = skaiciai
let d = 2
let e = 1
//[e, d] = [d, e]

function kazkokiaFunkcija({ foo, bar }) {
    console.log('foo=', foo, 'bar=', bar)
}

kazkokiaFunkcija({
    foo: 21,
    bar: -3
})

function grazinaDaugiauNei1Reiksme() {
    return [1, 'labas']
}

const [vienas, labas] = grazinaDaugiauNei1Reiksme()

function multiply(a, b = 1) {
    return a * b
}
console.log(multiply(4))
