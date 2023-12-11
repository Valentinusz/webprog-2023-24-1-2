const usernameTakenErrorDiv = document.querySelector('div#taken-error');
const usernameInput = document.querySelector('input#username')

usernameInput.addEventListener('focusout', async () => {
    /**
     * @type {{in_use: boolean}}
     */
    const data = await (await fetch(`ajax/is_username_taken.php?username=${usernameInput.value}`)).json();

    usernameTakenErrorDiv.hidden = !data.in_use
})