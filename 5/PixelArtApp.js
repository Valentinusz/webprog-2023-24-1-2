import {PixelArtForm} from "./PixelArtForm.js";
import {PixelArtGrid} from "./PixelArtGrid.js";
import {PixelArtGallery} from "./PixelArtGallery.js";



export function PixelArtApp() {
    const pixelArts = [
        {id: 1, grid: [['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF'], ['#000', '#000' ,'#000']]},
        {id: 2, grid: [['#000', '#000' ,'#000'], ['#FFF', '#000' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]},
        {id: 3, grid: [['#000', '#000' ,'#000'], ['#FFF', '#FFF' ,'#FFF'], ['#FFF', '#000' ,'#FFF']]}
    ];

    const section = document.createElement('section');

    const gallery = PixelArtGallery(pixelArts);
    gallery.addEventListener('click', event => {
        const targetElement = event.target.closest('li');

        if (gallery.contains(targetElement)) {
            loadArt(pixelArts.find(art => art.id == targetElement.dataset.index));
        }
    })

    section.appendChild(gallery);

    let selectedArt = undefined;
    let pixelArtGrid = undefined;

    const createGrid = (width, height) => {
        if (pixelArtGrid) {
            pixelArtGrid.remove();
        }

        selectedArt = undefined;

        pixelArtGrid = PixelArtGrid({width, height: height}, handleSave);
        section.appendChild(pixelArtGrid);
    }

    const loadArt = (art) => {
        if (pixelArtGrid) {
            pixelArtGrid.remove();
        }

        selectedArt = art;

        pixelArtGrid = PixelArtGrid({initialGrid: art.grid}, handleSave);
        section.appendChild(pixelArtGrid);
    }

    section.appendChild(PixelArtForm(createGrid));

    const handleSave = grid => {
        if (selectedArt) {
            selectedArt.grid = grid;
        } else {
            selectedArt = {id: pixelArts.length + 1, grid};
            pixelArts.push(selectedArt);
        }
    }


    return section;
}