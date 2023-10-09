import {PixelArtForm} from "./PixelArtForm.js";
import {PixelArtGrid} from "./PixelArtGrid.js";
import {makeGalleryContent, PixelArtGallery} from "./PixelArtGallery.js";

/**
 * Simple app for drawing pixel arts.
 * @returns {HTMLElement} a html element containing all elements needed by the app.
 * @constructor
 */
export function PixelArtApp() {
    // ÁLLAPOTTÉR
    /** @typedef {string[][]} PixelArtEditorGrid */
    /** @typedef {{id: number, grid: PixelArtEditorGrid}} PixelArt */
    /** @type {PixelArt[]} */
    const pixelArts = [
        {id: 1, grid: [['#FFF', '#000', '#FFF'], ['#FFF', '#000', '#FFF'], ['#000', '#000', '#000']]},
        {id: 2, grid: [['#000', '#000', '#000'], ['#FFF', '#000', '#FFF'], ['#FFF', '#000', '#FFF']]},
        {id: 3, grid: [['#000', '#000', '#000'], ['#FFF', '#FFF', '#FFF'], ['#FFF', '#000', '#FFF']]}
    ];

    /** @type {PixelArt} Currently selected entry from the pixel arts array. */
    let selectedArt = undefined;

    /** @type {HTMLElement} HTML element of the currently selected pixel art. */
    let pixelArtGrid = undefined;

    // ESEMÉNYKEZELŐK
    const handleSave = grid => {
        if (selectedArt) {
            selectedArt.grid = grid;
        } else {
            selectedArt = {id: pixelArts.length + 1, grid};
            pixelArts.push(selectedArt);
        }
        pixelArtGallery.innerHTML = makeGalleryContent(pixelArts);
    }

    // FELÜLET
    const section = document.createElement('section');

    const pixelArtGallery = PixelArtGallery(pixelArts);
    section.appendChild(pixelArtGallery);
    pixelArtGallery.addEventListener('click', event => {
        // köztes elemre kell delegálni

        const targetElement = event.target.closest('li');
        // event.target legközelebbi adott szelektorú szülője vagy önmaga

        // contains megadja, hogy a részfában, melynek az adott dom elem a csúcsa benne van-e az adott elem
        if (pixelArtGallery.contains(targetElement)) {
            // néha nem tudjuk elkerülni, hogy adatot tároljunk a HTML-ben
            const toLoad = pixelArts.find(art => art.id === Number.parseInt(targetElement.dataset.index, 10));

            pixelArtGrid?.remove();

            selectedArt = toLoad;
            pixelArtGrid = PixelArtGrid({initialGrid: toLoad.grid, handleSave});

            section.appendChild(pixelArtGrid);
        }
    })

    section.appendChild(PixelArtForm({
        handleSubmit: (width, height) => {
            pixelArtGrid?.remove();

            selectedArt = undefined;
            pixelArtGrid = PixelArtGrid({width, height: height, handleSave});

            section.appendChild(pixelArtGrid);
        }
    }));

    return section;
}