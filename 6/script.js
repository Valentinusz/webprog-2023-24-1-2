// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

const canvas = document.querySelector('#game');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// otherEntity.y + otherEntity.height < this.y ||
// this.x + this.width < otherEntity.x ||
// this.y + this.height < otherEntity.y ||
// otherEntity.x + otherEntity.width < this.x

