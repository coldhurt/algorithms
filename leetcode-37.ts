function isValid(x: number, y: number, n: string, board: string[][]): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[x][i] === n || board[i][y] === n) return false
  }

  const startRow = Math.floor(x / 3) * 3
  const startCol = Math.floor(y / 3) * 3

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === n) return false
    }
  }

  return true
}

/**
Do not return anything, modify board in-place instead.
*/
function solveSudoku(board: string[][]): void {
  let nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  function solve(board: string[][]) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let n of nums) {
            if (isValid(i, j, n, board)) {
              board[i][j] = n
              if (solve(board)) return true
              board[i][j] = '.'
            }
          }
          return false
        }
      }
    }
    return true
  }
  solve(board)
}
