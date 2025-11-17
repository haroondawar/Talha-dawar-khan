const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 80, paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false, leftPressed = false;

let ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius*2) + ballRadius;
let ballY = 0;
let ballSpeed = 2;

let score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}
function keyUpHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = "#00ff99";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
}

function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius*2) + ballRadius;
  ballY = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawScore();

  // Move paddle
  if(rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 5;
  else if(leftPressed && paddleX > 0) paddleX -= 5;

  // Move ball
  ballY += ballSpeed;

  // Collision with paddle
  if(ballY + ballRadius > canvas.height - paddleHeight - 10 &&
     ballX > paddleX && ballX < paddleX + paddleWidth) {
    score++;
    resetBall();
  }

  // Missed ball
  if(ballY > canvas.height) {
    score = 0;
    resetBall();
  }

  requestAnimationFrame(draw);
}

draw();
