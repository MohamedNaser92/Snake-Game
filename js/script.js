'use strict';


const finalResult = document.querySelector('.final-result');
const scoreResult = document.querySelector(".score");
const scoreResultTop = document.getElementById("score");
const highScoreResult = document.querySelector('.high-score')
const highScoreResultTop = document.getElementById('high-score')
const playArea = document.querySelector('.play-area');
const again = document.querySelector('.again');


//Declare variables
let highScore = localStorage.getItem("highScore") || 0;
highScoreResult.innerHTML = highScore;
highScoreResultTop.innerHTML = highScore;

let snake = [];
let snakeGridX = 15;
let snakeGridY = 18;
let snakeDirectionX = 0;
let snakeDirectionY = 0;
let score = 0;
let gameOver = false;
let foodGridX;
let foodGridY;
let setIntervalNew

// Random position of food
const foodGrid = function () {
    foodGridX = Math.floor(Math.random() * 35 + 1);
    foodGridY = Math.floor(Math.random() * 25 + 1);
};




//Dirextions 
const direction = function (e) {
    if (e.key === "ArrowUp" && snakeDirectionY != 1) {
        snakeDirectionX = 0;
        snakeDirectionY = -1;
    } else if (e.key === "ArrowDown" && snakeDirectionY != -1) {
        snakeDirectionX = 0;
        snakeDirectionY = 1;
    } else if (e.key === "ArrowLeft" && snakeDirectionX != 1) {
        snakeDirectionX = -1;
        snakeDirectionY = 0;
    } else if (e.key === "ArrowRight" && snakeDirectionX != -1) {
        snakeDirectionX = 1;
        snakeDirectionY = 0;
    }
}


const endGame = function () {
    finalResult.classList.remove('hidden')
    document.querySelector('body').style.backgroundColor = 'hwb(0 0% 0% / 0.6)';
}


const startGame = function () {
    if (gameOver) { endGame() };

    //Start Game and insert food
    let html = `<div class="food" style="grid-area:${foodGridY}/${foodGridX};"></div>`
    if (snakeGridX === foodGridX && snakeGridY === foodGridY) {
        foodGrid();
        console.log(foodGridX);
        console.log(foodGridY);

        snake.push([foodGridX, foodGridY]);
        score++;
        scoreResult.innerHTML = score;
        scoreResultTop.innerHTML = score;
        if (score >= highScore) {
            highScore = score
            localStorage.setItem('highScore', highScore)
        };
    };

    snakeGridX += snakeDirectionX;
    snakeGridY += snakeDirectionY;
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    };
    // shifting element of snake to head
    snake[0] = [snakeGridX, snakeGridY];

    // hit bordere
    if (snakeGridX <= 0 || snakeGridX > 35 || snakeGridY <= 0 || snakeGridY > 25) {
        return gameOver = true;
    };


    for (let i = 0; i < snake.length; i++) {

        html += `<div class="snake" style="grid-area: ${snake[i][1]} / ${snake[i][0]};"></div>`;

        if (i !== 0 && snake[0][1] === snake[i][1] && snake[0][0] === snake[i][0]) {
            gameOver = true;
        }
    }
    playArea.innerHTML = html
}



foodGrid();

startGame()
setIntervalNew = setInterval(startGame, 100);

document.addEventListener("keyup", direction);

again.addEventListener("click", function () {
    location.reload()

})
