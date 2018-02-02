export function makeBoard(board: string[][]) {
    function incrementMineCount(x: number, y: number): string {
        if (board[x][y] == 'x') {
            return 'x'
        }
        if (board[x][y] == ' ') {
            return '1'
        }
        const prevCount = parseInt(board[x][y])
        return (prevCount + 1).toString()
    }

    function isInBoard(x: number, y: number) {
        if (x < 0) {
            return false
        }

        if (x >= board.length) {
            return false
        }

        if (y < 0) {
            return false
        }

        if (y >= board[x].length) {
            return false
        }

        return true
    }

    function markMine(x: number, y: number) {
        if (isInBoard(x, y)) {
            board[x][y] = incrementMineCount(x, y)
        }
    }

    for (let x = 0; x < board.length; x++) {
        let row = board[x]
        for (let y = 0; y < row.length; y++) {
            if (row[y] == 'x') {
                markMine(x, y + 1)
                markMine(x, y - 1)
                markMine(x + 1, y)
                markMine(x - 1, y)
                markMine(x + 1, y + 1)
                markMine(x - 1, y + 1)
                markMine(x + 1, y - 1)
                markMine(x - 1, y - 1)
            }
        }
    }
    return board
}
