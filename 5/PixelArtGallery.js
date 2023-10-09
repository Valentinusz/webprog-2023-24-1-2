import {makeGridContent} from "./utils.js";

export function PixelArtGallery(arts) {
    const ol = document.createElement('ol');
    ol.classList.add('list')
    ol.innerHTML = arts.map(art => `<li data-index="${art.id}"><table class="preview">${makeGridContent(art.grid)}</table></li>`).join(" ")

    return ol;
}