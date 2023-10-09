import {makeGridContent} from "./utils.js";

export function PixelArtGrid({width, height, initialGrid}, handleSave) {
    // állapottér
    const grid = initialGrid ?? Array.from({length: height}).map(() => Array.from({length: width}).fill('#FFFFFF'));
    let primaryColor = '#FFF000';

    // állapotátmenetek
    const draw = (row, column, color) => grid[row][column] = color;

    const changePrimaryColor = (color) => {
        return primaryColor = color;
    }

    // felület
    const gridDiv = document.createElement('div');

    const menu = document.createElement('section');
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = primaryColor;

    colorInput.addEventListener('change', () => {
        changePrimaryColor(colorInput.value);
    })

    menu.appendChild(colorInput);

    const saveButton = document.createElement('button');
    saveButton.innerText = "Mentés"
    saveButton.addEventListener('click', () => handleSave(grid));
    menu.appendChild(saveButton)

    gridDiv.appendChild(menu);


    const table = document.createElement('table');
    table.classList.add('edit');
    table.innerHTML = makeGridContent(grid);

    const handleCellClick = (event, color) => {
        if (event.target.matches('td')) {
            const td = event.target;
            event.target.style.backgroundColor = draw(td.parentElement.rowIndex, td.cellIndex, color);
        }
    }

    table.addEventListener('click', evt => handleCellClick(evt, primaryColor));

    table.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleCellClick(event, '#FFFFFF');
    })

    gridDiv.appendChild(table);



    return gridDiv;
}