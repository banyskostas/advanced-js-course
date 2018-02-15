import { add } from './dependency'
import { add as add2 } from './dependency4'
import * as dep2 from './dependency2'
import div from './dependency3'

console.log(add(1, 2))
console.log(dep2.multiply(2, 3))
console.log(div(6, 3))
console.log(add2(4, 5))
