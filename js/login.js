const input = document.getElementById('login-input');
const button = document.getElementById('login-button');
const form = document.getElementById('login-form');


const validateInput = (event) => {
    if(event.target.value.trim() !== '') {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', true);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html'
}


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);