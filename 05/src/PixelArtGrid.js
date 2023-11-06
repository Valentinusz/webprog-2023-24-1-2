/**
 * Constructs the main grid used for drawing in the app. Either uses a width and height property or an existing grid to
 * determine dimensions.
 *
 * @param width {number|undefined} Optional. Width of the grid.
 * @param height {number|undefined} Optional. Height of the grid.
 * @param initialGrid {PixelArtEditorGrid|undefined} Optional. An already created grid to load.
 * @param handleSave {!Function} Function to be run when the save button is clicked.
 * @returns {HTMLDivElement}
 */
export function PixelArtGrid({width, height, initialGrid, handleSave}) {
    // ÁLLAPOTTÉR
    // az alkalmazás működtetéséhez szükséges adatok
    // érdemes az alkalmazást egy állapotgépként felfogni

    /** @type {string} primary color used for drawing. */
    let primaryColor = '#FF0000';

    /** @type {string} secondary color used for drawing. Also, the color used for erasing. */
    let secondaryColor = '#FFFFFF';

    /**  @type {boolean} boolean that holds whether we are drawing continuously or drawing single points. */
    let continuouslyDrawing = false;


    /** @type {PixelArtEditorGrid} */
    const grid = initialGrid ?? Array.from({length: height}).map(() =>
        Array.from({length: width}).fill(secondaryColor)
    );
    // null coalescing operator, ha a bal oldal null akkor a jobb oldalt adja vissza különben a bal oldalt



    // ÁLLAPOTÁTMENETEK
    // az adatok frissítésért felelős műveletekek
    // az eseménykezelő függvények hívják meg őket

    /**
     * Draws at the given point of the grid.
     * @param row {!number} row to draw at.
     * @param column {!number} column to draw at.
     * @param color {string} hex string of the color.
     */
    const draw = (row, column, color) => grid[row][column] = color;

    /**
     * Changes the primary color to a new one.
     * @param color new value for primary color.
     */
    const changePrimaryColor = (color) => primaryColor = color;

    // ha jobban el szeretnénk választani, akkor érdemes az állapotot és az állapotátmeneteket külön szervezni
    // pl. osztály, függvény esetleg modul



    // FELÜLET
    // a fületet és az adat közt az eseménykezelő függvények teremtenek kapcsolatot
    // állapotátmeneti függvényeket hívnak
    // az új állapot alapján frissítik a felületet, ehhez két megközelítés van
    //   imperatív - specifikusan frissítem a felületet ahol kell (hatékony)
    //   deklaratív - a felületem egy részét felülírom egy újonnan előállított felületrészlettel (kényelmes)
    // helyes megoldás valahol a kettő között van, de ez nem ennek a tárgynak a témája
    const gridDiv = document.createElement('div');

    const menu = document.createElement('section');
    gridDiv.appendChild(menu);

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = primaryColor;
    colorInput.addEventListener('change', () => changePrimaryColor(colorInput.value));
    menu.appendChild(colorInput);

    const saveButton = document.createElement('button');
    saveButton.innerText = "Mentés"
    saveButton.addEventListener('click', () => handleSave(grid));
    menu.appendChild(saveButton)

    const table = document.createElement('table');
    table.classList.add('edit');
    table.innerHTML = makeGridContent(grid);
    // ezért nem írjuk felül az egész táblázatot, mivel így az eseménykezelők megszűnnének
    gridDiv.appendChild(table);

    const handleCellClick = (event, color) => {
        if (event.target.matches('td')) {
            /** @type {HTMLTableCellElement} */
            const td = event.target;
            event.target.style.backgroundColor = draw(td.parentElement.rowIndex, td.cellIndex, color);
        }
    }

    table.addEventListener('click', evt => handleCellClick(evt, primaryColor));
    table.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleCellClick(event, secondaryColor);
    })
    // folyamatos rajzoláshoz szükséges események
    table.addEventListener('mousedown',  () => continuouslyDrawing = true);
    table.addEventListener('mouseup', ()=> continuouslyDrawing = false);
    table.addEventListener('mouseover', event => {
        if (continuouslyDrawing && event.target.matches('td')) {
            handleCellClick(event, primaryColor);
        }
    });
    table.addEventListener('mouseleave', () => continuouslyDrawing = false);

    return gridDiv;
}

/**
 * Creates the inner content of a grid table as a string.
 * @param grid grid to create show.
 * @returns {string} string ready to be set as innerHTML of a table.
 */
export const makeGridContent = grid => grid.map(row =>
    `<tr>${row.map(cell => `<td style="background-color: ${cell}"></td>`).join(" ")}</tr>`
).join("")