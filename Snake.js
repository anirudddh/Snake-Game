const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;
ctx.fillStyle = "grey";
ctx.fillRect(0, 0, box, 19 * box);
ctx.fillRect(0, 0, 19 * box, 3 * box);
ctx.fillRect(17 * box, 0, 2 * box, 19 * box);
ctx.fillRect(0, 17 * box, 19 * box, 2 * box);


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box

}
snake[1] = {
    x: 9 * box,
    y: 10 * box

}
const dead = new Audio();
const eat = new Audio();
dead.src = "die.ogg";
eat.src = "eat.ogg";


let food = {
    x: Math.floor(Math.random() * 15 + 2) * box,
    y: Math.floor(Math.random() * 13 + 4) * box,
}

let score = 0;

//control the snake

let d = "LEFT";
document.addEventListener("keydown", direction);

function direction(event) {

    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    } console.log(d);
}
//check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    } return false;
}

function draw() {

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i == 0) ? "green" : "blue";

        ctx.fillRect(snake[i].x, snake[i].y, box, box);

    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x - 0.5 * box, food.y - 0.5 * box, 0.4 * box, 0 * Math.PI, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (d == "LEFT") {
        snakeX -= box;
    } else if (d == "UP") {
        snakeY -= box;
    } else if (d == "RIGHT") {
        snakeX += box;
    } else if (d == "DOWN") {
        snakeY += box;
    }

    //if the snake eats the food

    if (d == "LEFT" && snakeX == food.x - box && snakeY == food.y - box) {
        score++
        eat.play();
        food = {
            x: Math.floor(Math.random() * 15 + 2) * box,
            y: Math.floor(Math.random() * 13 + 4) * box,
        }
    } else if (d == "RIGHT" && snakeX == food.x - box && snakeY == food.y - box) {
        score++
        eat.play();
        food = {
            x: Math.floor(Math.random() * 15 + 2) * box,
            y: Math.floor(Math.random() * 13 + 4) * box,
        }
    } else if (d == "UP" && snakeX == food.x - box && snakeY == food.y - box) {
        score++
        eat.play();
        food = {
            x: Math.floor(Math.random() * 15 + 2) * box,
            y: Math.floor(Math.random() * 13 + 4) * box,
        }
    } else if (d == "DOWN" && snakeX == food.x - box && snakeY == food.y - box) {
        score++;
        console.log(snakeX);
        console.log(food.x);
        eat.play();
        food = {
            x: Math.floor(Math.random() * 15 + 2) * box,
            y: Math.floor(Math.random() * 13 + 4) * box,
        }
    } else {
        //remove the tail
        let oldSnake = snake.pop();
        ctx.fillStyle = "aquamarine";
        ctx.fillRect(oldSnake.x, oldSnake.y, box, box);

    }

    // ADD NEW HEAD


    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // game over 

    if (snakeX < box || snakeX > 16 * box || snakeY < 3 * box
        || snakeY > 16 * box || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);

    }

    snake.unshift(newHead);

    ctx.fillStyle = "grey";
    //ctx.font = "45px Changa one";
   // ctx.fillText(score - 1, 2 * box, 1.6 * box);
   ctx.fillRect(0, 0, 19 * box, 3 * box);

    ctx.fillStyle = "black";
    ctx.font = "45px Changa one";
    ctx.fillText(score,  2* box, 1.6 * box);

}

let game = setInterval(draw, 100);
