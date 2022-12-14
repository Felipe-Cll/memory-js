const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'Bebe Stevens',
    'Butters Stotch',
    'Eric Cartman',
    'Jimmy Valmer',
    'Timmy Burch',
    'Kyle Broflovski',
    'Ike Broflovski',
    'Nichole Daniels',
    'Stan Marsh',
    'Wendy Testaburguer'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(this.loop);
        alert (`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            
            firstCard = '';
            secondCard = '';

        }, 500);

    }
};

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {
        
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../assets/imagens/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const doubleCharacters = [ ...characters, ...characters ];
    const shuffledArray = doubleCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

    seconds = 0;
    minutes = 0;
    this.loop = setInterval(startTimer, 1000);
};

let seconds = 0, minutes = 0;

const startTimer = () => {

    seconds += 1;
    
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timer.innerHTML = `${minutesValue}:${secondsValue}`;
};

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
};