import {random} from "./utils.js";
import {CanvasEntity} from "./CanvasEntity.js";

/**
 * Class representing the column obstacles in the game.
 */
export class Obstacle extends CanvasEntity {
    static OBSTACLE_GAP = 150;
    static OBSTACLE_SPRITE = Object.assign(new Image(), {src: 'assets/column.png'});
    static OBSTACLE_SPEED = -200;

    /**
     * @constructor
     * @param x {number} x coordinate of the obstacle.
     * @param y {number} y coordinate of the obstacle.
     * @param height {number} height of the obstacle.
     * @param context {CanvasRenderingContext2D} context of the canvas the obstacle will be displayed on.
     */
    constructor(x, y, height, context) {
        super(x,  y, 30, height, Obstacle.OBSTACLE_SPRITE, context)
    }

    /**
     * Updates the position of the obstacle on the x-axis.
     * @param dt {number} change of time since last frame.
     */
    update(dt) {
        this.x += Obstacle.OBSTACLE_SPEED * dt;
    }

    /**
     * Checks if the column is out of bounds, meaning it has left the canvas area to the left.
     * @returns {boolean}
     */
    isOutOfBounds() {
        return this.x < 0;
    }

    /**
     * Creates an array containing two obstacles, with a fixed gap between them.
     *
     * @param context {CanvasRenderingContext2D} canvas context to create obstacles for.
     * @returns {Obstacle[]}
     */
    static makeObstaclePair(context) {
        const firstHeight = random(50, 125);
        const firstObstacle = new Obstacle(400, 0, firstHeight, context);

        const secondHeight = context.canvas.height - this.OBSTACLE_GAP - firstHeight;
        const secondObstacle = new Obstacle(400, context.canvas.height - secondHeight, secondHeight, context)

        return [firstObstacle, secondObstacle];
    }
}