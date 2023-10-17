// JS-be nincs absztrakt, JavaDoc a fejlesztői környezetnek mondja csak meg, hogy ez absztrakt így az IDE hibát fog jelezni
/**
 * Class representing an entity on the game canvas.
 * @abstract
 */
export class CanvasEntity {
    /**
     * @constructor
     * @param context {CanvasRenderingContext2D} context of the canvas the entity will be displayed on.
     * @param x {number} x coordinate of the entity.
     * @param y {number} y coordinate of the entity.
     * @param width {number} width of the entity's hitbox.
     * @param height {number} height of the entity's hitbox.
     * @param sprite {HTMLImageElement} image element used as the sprite of the entity.
     */
    constructor(x, y, width, height, sprite, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.context = context;
    }

    /**
     * Draws the entity on its canvas.
     */
    draw() {
        this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    // nincs absztrakt metódus ez a legjobb amit tudunk
    /**
     * Updates the position of the entity.
     * @param dt {number} time change between frames.
     * @abstract
     */
    update(dt) {
        console.error('CanvasEntity should not be instantiated.');
    }

    /**
     * Returns whether the entity is out of bounds.
     * @abstract
     */
    isOutOfBounds() {
        console.error('CanvasEntity should not be instantiated.');
    }

    /**
     * Checks if the entity is colliding with another entity.
     * @param otherEntity {CanvasEntity} entity to check.
     * @returns {boolean}
     */
    isColliding(otherEntity) {
        return !(
            otherEntity.y + otherEntity.height < this.y ||
            this.x + this.width < otherEntity.x ||
            this.y + this.height < otherEntity.y ||
            otherEntity.x + otherEntity.width < this.x
        );
    }
}