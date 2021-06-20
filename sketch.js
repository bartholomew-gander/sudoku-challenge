let cellSize = 40;
let spacing = cellSize / 2 + 0;
let margin = spacing + 9 * cellSize + spacing;
let numberChoserY = margin;
let numberDrawftY = margin + spacing * 2;

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// let gameBoard = [[4,8,3,7,2,6,1,5,9],[7,2,6,1,5,9,4,8,3],[1,5,9,4,8,3,7,2,6],[8,3,7,2,6,1,5,9,4],[2,6,1,5,9,4,8,3,7],[5,9,4,8,3,7,2,6,1],[3,7,2,6,1,5,9,4,8],[6,1,5,9,4,8,3,7,2],[9,4,8,3,7,2,6,1,5]];
// let gameBoard = [[4,8,3,7,2,6,1,5,9],[7,2,6,1,5,9,4,8,3],[1,5,9,4,8,3,7,2,6],[8,3,7,2,6,1,5,9,4],[2,6,1,5,9,4,8,3,7],[5,9,4,8,3,7,2,6,1],[3,7,2,6,1,5,9,4,8],[6,1,5,9,4,8,3,7,2],[9,4,8,3,7,2,6,1,5]];
// let gameBoard = [[0,0,0,0,0,0,0,0,0],[0,2,0,1,0,0,0,0,0],[1,0,0,0,0,0,0,2,0],[0,0,0,2,0,1,0,0,0],[2,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,2,0,1],[0,0,2,0,1,0,0,0,0],[0,1,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0,0]];


let possibilities = (function() {
  let board = [];
  for (let i = 1; i <= 9; i++) {
    let row = [];
    for (let j = 1; j <= 9; j++) {
      // row.push([1,2,3,4,5,6,7,8,9]); // fill in with all numbers
      row.push([]); // fill in with empty suggestions
    }
    board.push(row);
  }
  return board;
})();

let blockedFields = [];

for (let j = 0; j < 9; j++) {
  blockedFields[j] = [];
  for (let i = 0; i < 9; i++) {
    blockedFields[j][i] = gameBoard[j][i];
  }
}

let fieldActiveX = 2;
let fieldActiveY = 4;

function setup() {
  createCanvas(spacing + cellSize * 9 + spacing, margin*2 + cellSize + spacing);
  textSize(cellSize * 0.75);
  textAlign(CENTER, CENTER);
}

let focusedSpecialNumber = null;

function focusOn(num) {
  focusedSpecialNumber = num;
}

function drawBoard() {
  let activeNumber =
    fieldActiveX != null ? gameBoard[fieldActiveY][fieldActiveX] : null;

  if (focusedSpecialNumber != null) {
    activeNumber = focusedSpecialNumber;
  }

  textSize(40);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      fill(color("white"));

      if (fieldActiveX == i || fieldActiveY == j) {
        fill(color("#E2E7ED"));
      }
      if (fieldActiveX == i && fieldActiveY == j) {
        fill(color("#BFDBFD"));
      } else if (gameBoard[j][i] == activeNumber && activeNumber) {
        fill(color("#CDD0DD"));
      } else if (activeNumber && possibilities[j][i].indexOf(activeNumber) > -1) {
        if (!gameBoard[j][i]) fill(color("#00D0DD"));
      }
      if (
        mouseX > spacing + i * cellSize &&
        mouseX < spacing + (i + 1) * cellSize &&
        mouseY > spacing + j * cellSize &&
        mouseY < spacing + (j + 1) * cellSize
      ) {
        fill(color("gray"));
      }
      rect(spacing + i * cellSize, spacing + j * cellSize, cellSize, cellSize);

      if (gameBoard[j][i] != 0) {
        if (blockedFields[j][i]) {
          fill(color("black"));
        } else {
          fill(color("#325AAF"));
        }
        text(
          gameBoard[j][i],
          spacing + i * cellSize + cellSize / 2,
          spacing + j * cellSize + cellSize / 2
        );
      }
    }
  }
}

function drawNumberChoser() {
  for (let i = 0; i < 9; i++) {
    let x = spacing + i * cellSize;
    let y = numberChoserY;
    fill(color("white"));

    if (
      mouseX > x &&
      mouseX < x + cellSize &&
      mouseY > y &&
      mouseY < y + cellSize
    ) {
      fill(color("gray"));
    }

    rect(x, y, cellSize, cellSize);

    fill("#325AAF");
    text(i + 1, x + cellSize / 2, y + cellSize / 2);
  }
}


function drawNumberHighlighter() {
  for (let i = 0; i < 9; i++) {
    let x = spacing + i * cellSize;
    let y = numberDrawftY;
    fill(color("white"));

    if (
      mouseX > x &&
      mouseX < x + cellSize &&
      mouseY > y &&
      mouseY < y + cellSize
    ) {
      fill(color("gray"));
    }

    rect(x, y, cellSize, cellSize);

    fill("#325AAF");
    text(i + 1, x + cellSize / 2, y + cellSize / 2);
  }
}

function drawGrid() {
  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    let x = spacing + i * cellSize;
    let y = spacing;
    stroke(color("#BEC6D3"));
    if (i % 3 == 0) stroke(color("black"));
    line(x,y,x,y + cellSize * 9);
    line(y,x,y + cellSize * 9,x);
  }
}

function drawAnnotation() {
  textSize(12);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!gameBoard[j][i]) {
        for (const k in possibilities[j][i]) {
          if (Object.hasOwnProperty.call(possibilities[j][i], k)) {
            let xmargin =  cellSize / 6 + (cellSize / 3) * (k%3);
            let ymargin =  cellSize / 6 + (cellSize / 3) * (Math.floor(k/3));
            const element = `${possibilities[j][i][k]}`;
            // console.log(element);
            text(
              element,
              spacing + i * cellSize + xmargin,
              spacing + j * cellSize + ymargin
            );
          }
        }
      }
    }
  }
}

function draw() {
  background(255);
  fill(color("white"));
  noStroke();

  drawBoard();
  drawNumberChoser();
  drawNumberHighlighter();
  drawGrid();
  drawAnnotation();
}

function drawftNumberForCell(x, y, number) {
  let index = possibilities[y][x].indexOf(number);
  if (index > -1) {
    possibilities[y][x].splice(index, 1);
  } else {
    possibilities[y][x].push(number);
  }
}

function refreshSuggestions() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      possibilities[j][i] = findPossible(gameBoard, i, j)
    }
  }
}

function keyPressed() {
  if (fieldActiveX != null && fieldActiveY != null) {
    if (keyCode === BACKSPACE) {
      gameBoard[fieldActiveY][fieldActiveX] = 0;
    } else if (keyCode >= 49 && keyCode < 58) {
      let num = keyCode - 48;
      drawftNumberForCell(fieldActiveX, fieldActiveY, num);
    } else if (keyCode == 90) { // z
      possibilities[fieldActiveY][fieldActiveX] = findPossible(gameBoard, fieldActiveX, fieldActiveY);
    } else if (keyCode == 88) { // x
      refreshSuggestions();
    }
  }
}

function mouseClicked() {
  let found = false;

  // Clicking grid cells
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        mouseX > spacing + i * cellSize &&
        mouseX < spacing + (i + 1) * cellSize &&
        mouseY > spacing + j * cellSize &&
        mouseY < spacing + (j + 1) * cellSize
      ) {
        fieldActiveX = i;
        fieldActiveY = j;
        found = true;
        focusedSpecialNumber = null;
      }
    }
  }

  // Clicking number choser
  if (fieldActiveX != null && fieldActiveY != null) {
    for (let i = 0; i < 9; i++) {
      let x = spacing + i * cellSize;
      if (
        mouseX > x &&
        mouseX < x + cellSize &&
        mouseY > numberChoserY &&
        mouseY < numberChoserY + cellSize
      ) {
        if (!blockedFields[fieldActiveY][fieldActiveX]) {
          gameBoard[fieldActiveY][fieldActiveX] = i + 1; // put in number to the cell
        }
        found = true;
      }
    }
  }


  // Clicking number highlighter
  for (let i = 0; i < 9; i++) {
    let x = spacing + i * cellSize;
    if (
      mouseX > x &&
      mouseX < x + cellSize &&
      mouseY > numberDrawftY &&
      mouseY < numberDrawftY + cellSize
    ) {
      focusOn(i+1);
    }
  }

  // if clicked outside, unselecting number
  if (!found) {
    fieldActiveX = null;
    fieldActiveY = null;
  }
}
