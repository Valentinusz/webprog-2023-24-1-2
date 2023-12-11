const filterInput = document.querySelector('input#filter');
const contactsTableBody = document.querySelector('table tbody');

document.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();

    const data = await (await fetch(`ajax/filter_contacts.php?name=${filterInput.value}`)).text();

    console.log(data);

    contactsTableBody.innerHTML =  data
});


contactsTableBody.addEventListener('focusout', event => {
    if (!event.target.matches('input.note')) {
        return;
    }

    const contactId = event.target.closest('tr').dataset.id;

    const formData = new FormData();
    formData.append('note', event.target.value);

    fetch(`ajax/edit_note.php?id=${contactId}`, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response.ok);
    })
})


const deleteSelectedButton = document.querySelector('button#delete-selected');

deleteSelectedButton.addEventListener('click', () => {
    const checkedInputs = [...document.querySelector('input.select')].filter(box => box.checked);
})