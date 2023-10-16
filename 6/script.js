// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
import {random} from "./utils.js";

const canvas = document.querySelector('#game');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

/**
 * @abstract
 */
class CanvasEntity {
    constructor(x, y, width, height, sprite, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.context = context;
    }

    draw() {
        this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update(dt) {
        console.error('Hiba.')
    }

    /**
     * @return {boolean}
     */
    isOutOfBounds() {
        console.error('Hiba.')
    }

    isColliding(otherEntity) {
        return !(otherEntity.y + otherEntity.height < this.y ||
        this.x + this.width < otherEntity.x ||
        this.y + this.height < otherEntity.y ||
        otherEntity.x + otherEntity.width < this.x)
    }
}

class Bird extends CanvasEntity {
    static birdSprite = Object.assign(new Image(), {src: 'assets/bird.png'});

    constructor(x, y, width, height, context) {
        super(x,  y, width, height, Bird.birdSprite, context)
        this.verticalSpeed = 0;
        this.verticalAcceleration = 250;
    }

    update(dt) {
        this.y += this.verticalSpeed * dt;
        this.verticalSpeed += this.verticalAcceleration * dt;
    }

    flapWings() {
        this.verticalSpeed -= 200;
    }

    isOutOfBounds() {
        return this.y < 0 || this.y > this.context.canvas.height;
    }
}

class Obstacle extends CanvasEntity {
    static obstacleGap = 150;
    static obstacleSprite = Object.assign(new Image(), {src: 'assets/column.png'});
    static OBSTACLE_SPEED = -200;
    constructor(x, y, width, height, context) {
        super(x,  y, width, height, Obstacle.obstacleSprite, context)
    }

    update(dt) {
        this.x += Obstacle.OBSTACLE_SPEED * dt;
    }

    static makeObstaclePair(ctx) {
        const firstHeight = random(50, 125);
        const firstObstacle = new Obstacle(400, 0, 50, firstHeight, ctx);

        const secondHeight = ctx.canvas.height - this.obstacleGap - firstHeight;
        const secondObstacle = new Obstacle(400, ctx.canvas.height - secondHeight, 50, secondHeight, ctx)


        return [firstObstacle, secondObstacle];
    }

    isOutOfBounds() {
        return this.x < 0;
    }
}


const backGround = Object.assign(new Image(),  {src: 'assets/bg.png'})

let bird;
let previousTime;
let obstacles;
let score;
let isOver;

const scoreDiv = document.querySelector('#score');

function update(timeStamp) {
    const dt = (timeStamp - previousTime) / 1000;
    previousTime = timeStamp;

    bird.draw();
    bird.update(dt);

    obstacles.forEach(obstacle => {
        obstacle.update(dt);
    });

    if(obstacles[0].isOutOfBounds()) {
        obstacles = Obstacle.makeObstaclePair(ctx);
        score++;
        scoreDiv.innerText = score;
    }

    obstacles.forEach(obstacle => obstacle.draw());

    console.log(isOver)
    isOver = bird.isOutOfBounds() || obstacles[0].isColliding(bird) || bird.isColliding(obstacles[1]);
    console.log(isOver)

    ctx.drawImage(backGround, 0, 0, ctx.canvas.width, ctx.canvas.height);

    if (!isOver) {
        requestAnimationFrame(update)
    } else {
        scoreDiv.innerText = 0;
    }
}

start();


document.addEventListener('keyup', ev => {
    if (!isOver || ev.key === 'Space') {
        bird.flapWings();
    }
})

function start() {
    bird = new Bird(50, canvas.height / 2, 30, 50, ctx);
    previousTime = performance.now();
    obstacles = Obstacle.makeObstaclePair(ctx);
    score = 0;
    isOver = false;

    requestAnimationFrame(update);
}


document.querySelector('#restart').addEventListener('click', event => {
    console.log("asd")
    event.target.blur();
    start();
})