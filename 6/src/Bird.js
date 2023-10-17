import {CanvasEntity} from "./CanvasEntity.js";

/**
 * Class representing the bird in the game.
 */
export class Bird extends CanvasEntity {
    static BIRD_SPRITE = Object.assign(new Image(), {src: 'assets/bird.png'});

    /**
     * @constructor
     * @param context {CanvasRenderingContext2D} context of the canvas the entity will be displayed on.
     * @param x {number} x coordinate of the bird.
     * @param y {number} y coordinate of the bird.
     */
    constructor(x, y, context) {
        super(x,  y, 30, 50, Bird.BIRD_SPRITE, context);
        this.verticalSpeed = 0;
        this.verticalAcceleration = 250;
    }

    /**
     * Updates the position of the bird on the y-axis and changes its velocity based on its acceleration.
     * @param dt {number} change of time since last frame.
     */
    update(dt) {
        this.y += this.verticalSpeed * dt;
        this.verticalSpeed += this.verticalAcceleration * dt;
    }

    /**
     * Changes the vertical speed of the bird.
     */
    flapWings() {
        this.verticalSpeed -= 200;
    }

    /**
     * Checks if the bird is out of bounds. Since the bird can only move vertically only vertical checks are made.
     * @returns {boolean}
     */
    isOutOfBounds() {
        return this.y < 0 || this.y > this.context.canvas.height;
    }
}