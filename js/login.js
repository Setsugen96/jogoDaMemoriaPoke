const input = document.getElementById('login-input');
const login_button = document.getElementById('login-button');
const form = document.getElementById('login-form');
const ranking_button = document.getElementById('ranking-button');
const clearRanking_button = document.getElementById('clearRanking-button');
const modal_exit = document.getElementById('modal-exit');


const validateInput = (event) => {
    if(event.target.value.trim() !== '') {
        login_button.removeAttribute('disabled');
    } else {
        login_button.setAttribute('disabled', true);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html'
}


const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => document.getElementById('modal').classList.remove('active');

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
ranking_button.addEventListener('click', openModal);
modal_exit.addEventListener('click', closeModal);


// Funções do Ranking

const readPlayers = () => {
    const db_players = JSON.parse(localStorage.getItem('db_players')) || [];
    return db_players;
}

const createRow = (player, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.nome}</td>
        <td>${player.timer}</td>
    `
    document.getElementById('td-body').appendChild(newRow);
}

const atualizarRanking = () =>{
    const db_players = readPlayers();

    db_players.sort((a, b) => a.timer - b.timer);
    document.getElementById('td-body').innerHTML = '';
    db_players.forEach((player, index) => createRow(player, index));
}

const limparRanking = () =>{
    if(confirm("Deseja limpar o ranking?")) {
        document.getElementById('td-body').innerHTML = '';
        localStorage.removeItem('db_players');
    }
}

clearRanking_button.addEventListener('click', limparRanking);

atualizarRanking();

