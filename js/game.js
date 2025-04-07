const grid = document.getElementById('grid');

const imageArrays = [
    ['arcanine', 'charizzard', 'flygon', 'furret', 'greninja', 'ludicolo', 'mewtwo', 'mrmine', 'riolu', 'snorlax', 'totodile', 'zoroark'],
    ['banette', 'blastoise', 'chandelure', 'decidueye', 'espeon', 'gengar', 'larvitar', 'lucario', 'minun', 'plusle', 'togepi', 'umbreon'],
    
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

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 24) {
        alert('Fim de Jogo');
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

loadGame();

