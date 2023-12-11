const input = document.querySelector('input');

document.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();

    console.log(input.value);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)

    const data = await response.json();

    const locationResponse = await fetch(data.location_area_encounters);
    console.log(locationResponse);

    const locationData = await locationResponse.json();

    console.log(locationData);
})