const board = document.getElementById("board");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameOver = false;

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return cells.includes(null) ? null : "平手";
}

function handleClick(index) {
  if (cells[index] || gameOver) return;
  cells[index] = currentPlayer;
  render();
  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    message.textContent = winner === "平手" ? "平手！" : `${winner} 勝利！`;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function render() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value || "";
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  message.textContent = "";
  render();
});

render();
