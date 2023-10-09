export function PixelArtForm(handleSubmit) {
    const form = document.createElement('form');

    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.min = 1;
    widthInput.max = 100;

    form.appendChild(widthInput);

    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.min = 1;
    heightInput.max = 100;

    form.appendChild(heightInput);

    const button = document.createElement('button');
    button.innerText = "Létrehozás"

    form.appendChild(button)

    form.addEventListener('submit', event => {
        event.preventDefault();
        handleSubmit(Number.parseInt(widthInput.value, 10), Number.parseInt(heightInput.value, 10));
    })

    return form;
}