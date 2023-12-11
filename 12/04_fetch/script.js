const input = document.querySelector('input');

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    console.log(input.value);

    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`).then(response => {
        response.json().then(data => {
            console.log(data);

            fetch(data.location_area_encounters).then(locationResponse => {
                console.log(locationResponse);

                locationResponse.json().then(locationData => {
                    console.log(locationData);
                })
            })
        })
    })
})