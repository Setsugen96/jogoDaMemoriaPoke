const grid = document.getElementById('grid');
const spanPlayer = document.getElementById('player');
const timer = document.getElementById('timer');
const btn_reiniciar = document.getElementById('button__reiniciar');
const btn_voltar = document.getElementById('button__voltar');

const imageArrays = [
    ['arcanine', 'charizzard', 'flygon', 'furret', 'greninja', 'ludicolo', 'mewtwo', 'mrmine', 'riolu', 'snorlax', 'totodile', 'zoroark'],
    ['banette', 'blastoise', 'chandelure', 'decidueye', 'espeon', 'gengar', 'larvitar', 'lucario', 'minun', 'plusle', 'togepi', 'umbreon'],
    ['farfetch', 'garchomp', 'latias', 'latios', 'luxray', 'mawile', 'milotic', 'pidgeot', 'pikachu', 'rattata', 'rayquaza', 'salamance']
];


const chooseRandomArray = () => {
    const randomIndex = Math.floor(Math.random() * imageArrays.length);
    return imageArrays[randomIndex];
  };

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const getLocalStorage = () =>{
    let db_players = JSON.parse(localStorage.getItem('db_players'));
    if(!db_players) {
        db_players = [];
    }
    return db_players;
}

const setLocalStorage = (db_players) => localStorage.setItem("db_players", JSON.stringify(db_players));

const criarPlayer = (player) =>{
    const db_players = getLocalStorage();
    const playerIndex = db_players.findIndex(p => p.nome === player.nome);

    if(playerIndex !== -1) {
        const existingPlayer = db_players[playerIndex];
        if(player.timer < existingPlayer.timer) {
            db_players[playerIndex].timer = player.timer;
        } 
    } else {
        db_players.push(player);
    }
    
    setLocalStorage(db_players);
}

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 24) {
        clearInterval(this.loop);
        alert('Fim de Jogo');
        
        const player = {
            nome: spanPlayer.innerHTML,
            timer: timer.innerHTML
        }
        criarPlayer(player);
    }
}

const checkCards = () =>{
    const firstPokemon = firstCard.getAttribute('data-pokemon');
    const secondPokemon = secondCard.getAttribute('data-pokemon');

    if(firstPokemon == secondPokemon) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
       
    }
}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (card_image, imagePath) =>{

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../${imagePath}/${card_image}.png')`;

    card.appendChild(front)
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-pokemon', card_image);
    return card;
}

const loadGame = () => {

    const selectedArray = chooseRandomArray();
    const duplicateImages = [...selectedArray, ...selectedArray];
    const shuffledArray = duplicateImages.sort( ()=> Math.random() - 0.5);
   
    shuffledArray.forEach((cardImage)=>{
        const card_image = createCard(cardImage, `imagenspokemons${imageArrays.indexOf(selectedArray) + 1}`);
        grid.appendChild(card_image);
    });
}

const startTimer = () =>{
    let seconds = 0;
    this.loop = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = secs.toString().padStart(2, '0');

        timer.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();

    btn_reiniciar.addEventListener('click', ()=>{
        location.reload();
    })

    btn_voltar.addEventListener('click', ()=>{
        window.location.href = "../index.html";
    })
}






