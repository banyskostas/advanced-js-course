import { makeBoard } from './index'

describe('Minesweeper', () => {

    it('Should fill the minefield with numbers', () => {
        const result = makeBoard([
            [' ', 'x', ' ', ' ', ' '],
            [' ', 'x', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'x'],
            [' ', ' ', ' ', 'x', ' '],
            ['x', ' ', ' ', ' ', ' '],
        ])

        const expected = [
            ['2', 'x', '2', ' ', ' '],
            ['2', 'x', '2', '1', '1'],
            ['1', '1', '2', '2', 'x'],
            ['1', '1', '1', 'x', '2'],
            ['x', '1', '1', '1', '1'],
        ]

        expect(result).toEqual(expected)
    })

    it('Should mark the mine on the 1st cell in 1x2 board', () => {
        const result = makeBoard([
            ['x', ' ']
        ])
        expect(result).toEqual([['x', '1']])
    })

    it('Should mark empty 1x2 field', () => {
        const result = makeBoard([
            [' ', ' ']
        ])
        expect(result).toEqual([[' ', ' ']])
    })

    it('Should mark the mine on the last cell in 1x2 board', () => {
        const result = makeBoard([[' ', 'x']])
        expect(result).toEqual([['1', 'x']])
    })

    it('Should mark the mine on the last cell in 1x3 board', () => {
        const result = makeBoard([[' ', ' ', 'x']])
        expect(result).toEqual([[' ', '1', 'x']])
    })

    it('Should mark the mine on 2x1 board', () => {
        const result = makeBoard([
            ['x'],
            [' ']
        ])

        expect(result).toEqual([
            ['x'],
            ['1']
        ])
    })

    it('Should mark the mine on the last cell of 2x1 board', () => {
        const result = makeBoard([
            [' '],
            ['x']
        ])

        expect(result).toEqual([
            ['1'],
            ['x']
        ])
    })

    it('Should mark the mine on 2x2 board', () => {
        const result = makeBoard([
            ['x', ' '],
            [' ', ' ']
        ])

        expect(result).toEqual([
            ['x', '1'],
            ['1', '1']
        ])
    })

    it('Should mark the right-top mine on 2x2 board', () => {
        const result = makeBoard([
            [' ', 'x'],
            [' ', ' ']
        ])

        expect(result).toEqual([
            ['1', 'x'],
            ['1', '1']
        ])
    })

    it('Should mark the bottom-left mine on 2x2 board', () => {
        const result = makeBoard([
            [' ', ' '],
            ['x', ' ']
        ])

        expect(result).toEqual([
            ['1', '1'],
            ['x', '1']
        ])
    })

    it('Should mark the bottom-right mine on 2x2 board', () => {
        const result = makeBoard([
            [' ', ' '],
            [' ', 'x']
        ])

        expect(result).toEqual([
            ['1', '1'],
            ['1', 'x']
        ])
    })

    it('Should mark two mines in 1x3 board', () => {
        const result = makeBoard([['x', ' ', 'x']])
        expect(result).toEqual([['x', '2', 'x']])
    })

    it('Should mark two consecutive mines in 1x3 board', () => {
        const result = makeBoard([['x', 'x', ' ']])
        expect(result).toEqual([['x', 'x', '1']])
    })
})
