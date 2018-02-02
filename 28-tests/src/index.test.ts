import { factorial } from './index'
import { expect } from 'chai'

describe('Factorial', () => {
    it('Should return 1 for input 1', () => {
        const actual = factorial(1)
        expect(actual).to.equal(1)
    })

    it('Should return 2 for input 2', () => {
        const actual = factorial(2)
        expect(actual).to.equal(2)
    })

    it('Should return 120 for input 5', () => {
        const actual = factorial(5)
        expect(actual).to.equal(120)
    })
})
