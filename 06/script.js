import {Obstacle} from "./src/Obstacle.js";
import {Bird} from "./src/Bird.js";
import {saveScore} from "./src/saveScore.js";

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
const canvas = document.querySelector('#game');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const backGround = Object.assign(new Image(),  {src: 'assets/bg.png'});
const scoreDiv = document.querySelector('#score');

// állapottér
let bird;
let previousTime;
let obstacles;
let score;
let isOver = true;

/**
 * Sets the default values of the variables used by the game and starts the game loop.
 */
function start() {
    // reset state
    bird = new Bird(50, canvas.height / 2, ctx);
    previousTime = performance.now();
    obstacles = Obstacle.makeObstaclePair(ctx);
    score = 0;
    isOver = false;

    // reset score counter
    scoreDiv.innerText = 0;

    requestAnimationFrame(update);
}

/**
 * Updates the state of the game.
 * @param timeStamp {DOMHighResTimeStamp} timeStamp passed by the requestAnimationFrame function.
 */
function update(timeStamp) {
    const dt = (timeStamp - previousTime) / 1000;
    previousTime = timeStamp;

    // update state
    bird.update(dt);
    obstacles.forEach(obstacle => obstacle.update(dt));

    if(obstacles[0].isOutOfBounds()) {
        obstacles = Obstacle.makeObstaclePair(ctx);
        score++;
        scoreDiv.innerText = score;
    }

    isOver = bird.isOutOfBounds() || obstacles[0].isColliding(bird) || bird.isColliding(obstacles[1]);

    // update canvas
    // fontos a sorrend kirajzolásnál
    ctx.drawImage(backGround, 0, 0, ctx.canvas.width, ctx.canvas.height);
    bird.draw();
    obstacles[0].draw();
    obstacles[1].draw();

    if (isOver) {
        console.table(saveScore(score));
    } else {
        requestAnimationFrame(update);
    }
}

// eseménykezelők
document.addEventListener('keyup', event => {
    if (!isOver || event.key === 'Space') {
        bird.flapWings();
    }
})

document.querySelector('#restart').addEventListener('click', event => {
    // ha gombra kattintunk rákerül a fókusz, a fókuszt a blur metódussal tudjuk elvenni
    event.target.blur();
    start();
})