
// helper for other case :)
function cloneBoard(board) {
  let newBoard = [];
  for (let j = 0; j < 9; j++) {
    newBoard[j] = [];
    for (let i = 0; i < 9; i++) {
      newBoard[j][i] = board[j][i];
    }
  }

  return newBoard;
}

function findPossible(board, x, y) {
  let possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // check row
  for (let i = 0; i < 9; i++) {
    let index = possible.indexOf(board[y][i]);
    if (index > -1) {
      possible.splice(index, 1);
      if (possible.length == 0) return possible;
    }
  }
  // check column
  for (let i = 0; i < 9; i++) {
    let index = possible.indexOf(board[i][x]);
    if (index > -1) {
      possible.splice(index, 1);
      if (possible.length == 0) return possible;
    }
  }

  // check box
  let marginX = int(x / 3) * 3;
  let marginY = int(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let index = possible.indexOf(board[marginY + i][marginX + j]);
      if (index > -1) {
        possible.splice(index, 1);
        if (possible.length == 0) return possible;
      }
    }
  }

  // SPECIAL CASE

  // kings move
  for (let i = -1; i <= 1 && y + i < 9 && y + i >= 0; i++) {
    for (let j = -1; j <= 1 && x + j < 9 && x + j >= 0; j++) {
      let index = possible.indexOf(board[y + i][x + j]);
      if (index > -1) {
        possible.splice(index, 1);
        if (possible.length == 0) return possible;
      }
    }
  }

  // Knight's move
  var knights = [
    board[y-2]?.[x+1],
    board[y-2]?.[x-1],
    board[y+2]?.[x+1],
    board[y+2]?.[x-1],
    board[y+1]?.[x+2],
    board[y+1]?.[x-2],
    board[y-1]?.[x+2],
    board[y-1]?.[x-2]
  ];
  for (const val of knights) {
    let index = possible.indexOf(val);
      if (index > -1) {
        possible.splice(index, 1);
        if (possible.length == 0) return possible;
      }
  }

  // Consequetive
  var consequetive = [
    board[y-1]?.[x],
    board[y+1]?.[x],
    board[y]?.[x+1],
    board[y]?.[x-1]
  ];
  for (const val of consequetive) {
    if (!val) continue;
    let index = possible.indexOf(val-1);
    if (index > -1) {
      possible.splice(index, 1);
    }
    let index2 = possible.indexOf(val+1);
    if (index2 > -1) {
      possible.splice(index2, 1);
    }
    if (possible.length == 0) return possible;
  }

  return possible;
}