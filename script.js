let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(cellDiv);
  });
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    document.getElementById("status").textContent = `🎉 玩家 ${currentPlayer} 獲勝！`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "🤝 平手！";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `輪到玩家 ${currentPlayer}`;
  }
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b,c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = "開始遊戲！輪到玩家 X";
  renderBoard();
}

window.onload = () => {
  renderBoard();
  document.getElementById("status").textContent = "開始遊戲！輪到玩家 X";
};
