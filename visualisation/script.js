import { createChessClock } from '../src/app.js';

const clock = createChessClock(10000, 2000);

setInterval(() => {
  const { whiteTime, blackTime, activePlayer, gameOver } = clock.getState();

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";

    const minutes = Math.floor(Math.floor(ms / 1000) / 60);
    const seconds = Math.floor(ms / 1000) % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  document.getElementById("white-time").textContent = formatTime(whiteTime);
  document.getElementById("black-time").textContent = formatTime(blackTime);

  document
    .getElementById("white")
    .classList.toggle("active", activePlayer === "white");
  document
    .getElementById("black")
    .classList.toggle("active", activePlayer === "black");

  if (gameOver) {
    let winner = "Белые";
    if (whiteTime <= 0) winner = "Черные";

    document.getElementById("winner").textContent = `${winner} победили!`;
    document.getElementById("window").classList.remove("hidden");
  }
}, 100);

function startGame() {
  clock.switchPlayer();
  document.getElementById("btn-start").disabled = true;
}

function switchPlayer() {
  if (document.getElementById("btn-start").disabled == true) {
    clock.switchPlayer();
  }
}

function resetGame() {
  location.reload();
}

function closeWindow() {
  document.getElementById("window").classList.add("hidden");
  resetGame();
}
