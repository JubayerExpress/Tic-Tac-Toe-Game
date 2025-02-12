<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tic-Tac-Toe: Human vs Computer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 5px;
      margin: 20px auto;
    }
    .cell {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border: 2px solid #333;
      cursor: pointer;
    }
    .result {
      font-size: 1.5rem;
      margin-top: 20px;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Tic-Tac-Toe: Human vs Computer</h1>
  <div class="grid">
    <div class="cell" data-index="0"></div>
    <div class="cell" data-index="1"></div>
    <div class="cell" data-index="2"></div>
    <div class="cell" data-index="3"></div>
    <div class="cell" data-index="4"></div>
    <div class="cell" data-index="5"></div>
    <div class="cell" data-index="6"></div>
    <div class="cell" data-index="7"></div>
    <div class="cell" data-index="8"></div>
  </div>
  <div class="result"></div>
  <button id="restart">Restart Game</button>

  <script>
    const cells = document.querySelectorAll(".cell");
    const result = document.querySelector(".result");
    const restartButton = document.getElementById("restart");
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; // Human player is 'X'
    let gameActive = true;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          gameActive = false;
          result.innerText = `${board[a]} wins!`;
          return;
        }
      }

      if (!board.includes("")) {
        gameActive = false;
        result.innerText = "It's a draw!";
        return;
      }
    }

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.getAttribute("data-index");

      if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        checkWinner();

        if (gameActive) {
          currentPlayer = "O"; // Switch to computer
          setTimeout(computerMove, 500); // Delay for a more natural gameplay
        }
      }
    }

    function computerMove() {
      let availableCells = board
        .map((value, index) => (value === "" ? index : null))
        .filter((value) => value !== null);

      if (availableCells.length > 0) {
        const randomIndex =
          availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = "O";
        cells[randomIndex].innerText = "O";
        checkWinner();

        if (gameActive) {
          currentPlayer = "X"; // Switch back to human player
        }
      }
    }

    function restartGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      result.innerText = "";
      cells.forEach((cell) => (cell.innerText = ""));
    }

    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
  </script>
</body>
</html>
