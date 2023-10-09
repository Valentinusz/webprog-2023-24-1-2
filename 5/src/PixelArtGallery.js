import {makeGridContent} from "./PixelArtGrid.js";

/**
 * Constructs a list that shows the given pixel arts.
 *
 * @param arts pixel arts to show.
 * @returns {HTMLOListElement} Ordered list containing previews of the pixel arts.
 * @constructor
 */
export function PixelArtGallery(arts) {
    const ol = document.createElement('ol');
    ol.classList.add('list')
    ol.innerHTML = makeGalleryContent(arts)

    return ol;
}

/**
 * Creates the inner content of the pixel arts list.
 * @param arts arts to show.
 * @returns {string} string ready to be set as innerHTML property of a list element.
 */
export const makeGalleryContent = (arts) => arts.map(
    art => `<li data-index="${art.id}"><table class="preview">${makeGridContent(art.grid)}</table></li>`
).join("")