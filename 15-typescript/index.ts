var x = 1
x = 'sdsfds'

var y : number | string = 1
y = 'dsfdsfds'

type StringOrNumber = number | string

function add(x: number, y: number): number {
    return x + y
}

function setTimeout(darbas: ((param1: number, param2: string, param3: StringOrNumber) => void), kada: number) {

}

var point = {
    x: 1,
    y: 2
}

interface Point {
    x: StringOrNumber
    y: number
    z?: StringOrNumber[]
}

var p: Point
p = { x: 1, y: 2 }

function foo() : Promise<number> {
    return null;
}

foo().then(x => console.log(x.toFixed()))

interface TestFunction {
    (a: number, b: number, c: string): string
    foo: string
}

type Foo = Point | TestFunction

function kazkas(x: TestFunction) {
    x(1, 2, 'dgg')
    x.foo = '34r654'
}

type Point2 = { x: number, y: number }

class Point3 {
    private x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

function Point4(x, y) {
    let privateX =x

    this.doStuff = function() {
        console.log(privateX)
    }
}

function plot(p: Point) {
    console.log(p.x, p.y)
}

plot({ x: 1, y: 3, z: 5 })

console.log(add(1, 2))
console.log(add(23, 67))
console.log(add('dsfsdgds', console))
