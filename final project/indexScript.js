class Deck {
    constructor() {
    this.cards = this.createDeck();
    this.shuffle();
    }
    
    // Card factory method to generate a 52-card deck
    createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = [
    'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King'
    ];
    const deck = [];
    
    for (let suit of suits) {
    for (let rank of ranks) {
    deck.push({ rank: rank, suit: suit });
    }
    }
    
    return deck;
    }
    
    // Fisher-Yates shuffle algorithm
    shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    }
    
    // Draw a card from the top of the deck
    drawCard() {
    return this.cards.pop();
    }
    
    // Reset and reshuffle the deck
    resetDeck() {
        this.cards = this.createDeck();
        this.shuffle();
    }
    }

class card {
    static idGen = 0;
    #cardId;
    #cardElement;

    constructor(suit, value, cardContainer) {
        // These should be private, to fix later
        this.suit = suit;       // 0 = spades, 1 = hearts, 2 = diamonds, 3 = diamonds
        this.value = value > 11 ? value + 1 : value;
        this.icon = 127137 + (suit * 16) + this.value;
        this.color = (suit === 0 || suit === 3) ? 'black' : 'red';
        //private "helper" method
        this.#cardId = card.idGen++;
        this.#makeCardElement(cardContainer);
    }

    #makeCardElement(cardContainer) {
        this.#cardElement = document.createElement('span');
        this.#cardElement.innerHTML = '&#' + this.icon + ';';
        this.#cardElement.setAttribute('style', 'color: ' + this.color + ';');
        this.#cardElement.setAttribute('id', this.#cardId);
        this.#cardElement.setAttribute('data-value', this.value);
        this.#cardElement.setAttribute('data-suit', this.suit);
        this.#cardElement.setAttribute('draggable', true);

        this.#cardElement.style.cursor = 'pointer';
        //this.#cardElement.setAttribute();

        this.#cardElement.addEventListener('dragstart', this.#dragStart.bind(this));
        this.#cardElement.addEventListener('dragstart', this.#dragOver);
        this.#cardElement.addEventListener('drop', this.#dropCard);

        cardContainer.appendChild(this.#cardElement);
    }

    #dragStart(event) {
        const cardValues = {
            id: this.#cardId,
            suit: this.suit,
            value: this.value
        };

        console.log(cardValues);
        const curCard = JSON.stringify(cardValues);
        event.dataTransfer.setData('application/json', curCard);
    }

    #dragOver(event) {
        event.preventDefault();
    }

    #dropCard(event) { 
        const data = event.dataTransfer.getData('application/json');
        const cardValues = JSON.parse(data);

        const targetValue = {
            id: event.target.getAttribute('id'),
            suit: event.target.getAttribute('data-suit'),
            value: event.target.getAttribute('data-value')
        };

        if(dragCard.suit != targetValue.suit || cardValues.value != targetValue.value)
            return;     
        const cardTable = document.getElementsById('cardTable');
        const cards = Array.from(cardTable.children);
        const dragIndex = cards.findIndex(card => card.id == cardValues.id);
        const dropIndex = cards.findIndex(card => card.id === targetValue.id);
        const dif = dragIndex - dropIndex;
        if(dropIndex !== dragIndex - 1 || dropIndex !== dragIndex - 3)
            return;
        event.target.replaceWith(document.getElementById(cardValues.id));
    }
    
    get cardElement() {
        return this.#cardElement;
    }
}

class hand {

    #cards = [];
    #cardContainer;
    #winningHand = false;
    #bustedHand = false;
    #value = 0;

    constructor(cardContainer) {
        this.#cardContainer = cardContainer;
    }

    addCard(cardIn) {
        if(!(cardIn instanceof card)) {
            throw new Error('Invalid card object');
            return;
        }
        if(this.#cards.length >= 4) {
            this.#winningHand = true;
            return;
        }
        if(this.calculateValue() > 21) {
            this.#bustedHand = true;
            return;
        }
        this.#cards.push(card);
    }

    bust(){
        this.#bustedHand = true;
        this.#winningHand = false;
    }

    popCard() {
        if(this.cards.length === 0) {
            throw new Error('No cards to pop');
        }
        const card = this.cards.pop();
        card.cardElement.remove();
        return card;
    }

    calculateValue() {
        let value = 0;
        let aces = 0;
        for(const card of this.cards) {
            if(card.value === 1) {
                aces++;
            } else if(card.value > 10) {
                value += 10;
            } else {
                value += card.value;
            }
        }
        for(let i = 0; i < aces; i++) {
            if(value + 11 <= 21) {
                value += 11;
            } else {
                value += 1;
            }
        }
        return value;
    }

    //getter and setter for cards

    get cards() {
        return this.#cards;
    }

    set cards(input) {
        throw new Error('Cards cannot be set directly. Use addCard method instead.');
    }

    get cardContainer() {
        return this.#cardContainer;
    }

    set cardContainer(input) {
        throw new Error('Card container cannot be set after construction.');
    }

    get winningHand() {
        return this.#winningHand;
    }

    set winningHand(input) {
        throw new Error('Winning hand cannot be set directly. Use calculateValue method instead.');
    }

    get value() {
        return this.#value;
    }

    set value(input) {
        throw new Error('Value cannot be set directly. Use calculateValue method instead.');
    }
    
    get bustedHand() {
        return this.#bustedHand;
    }

    set bustedHand(input) {
        throw new Error('Busted hand cannot be set directly. use calculateValue method instead.');
    }
}

class player {
    #domDiv;
    #splitButton = null;
    #isActive = false;

    constructor(name) {
        this.name = name;
        this.#setupDiv();
        this.hand = new hand(this.#domDiv);
        this.splitHand = null;
        this.useSplitHand = false;
        this.addCard(new card(1, 1, this.#domDiv));
        this.addCard(new card(1, 1, this.#domDiv));
        if(this.hand.cards[0].value === this.hand.cards[1].value) {
            this.addSplitHandButton();
        }
    }

    #setupDiv() {
        this.#domDiv = document.createElement('div');
        this.#domDiv.setAttribute('id', name);
        this.#domDiv.setAttribute('class', 'player');
        document.getElementById('players').appendChild(this.#domDiv);
        const hitStandDiv = document.createElement('div');
        hitStandDiv.setAttribute('class', 'hitStandDiv');
        const hitButton = document.createElement('button');
        hitButton.setAttribute('class', 'hitButton');
        hitButton.innerText = 'Hit';
        hitStandDiv.appendChild(hitButton);
        const standButton = document.createElement('button');
        standButton.setAttribute('class', 'standButton');
        standButton.innerText = 'Stand';
        hitStandDiv.appendChild(standButton);
        this.#domDiv.appendChild(hitStandDiv);

        hitButton.addEventListener('click', this.onHit.bind(this));
        standButton.addEventListener('click', this.onStand.bind(this));
    }

    addSplitHandButton() {
        this.#splitButton = document.createElement('button');
        this.#splitButton.setAttribute('class', 'splitButton');
        this.#splitButton.innerText = 'Split';
        //add split to hitStandDiv
        const hitStandDiv = this.#domDiv.querySelector('.hitStandDiv');
        hitStandDiv.appendChild(this.#splitButton);
        this.#splitButton.addEventListener('click', this.trySplit.bind(this));
    }

    activatePlayer() {
        this.#isActive = true;
        this.#domDiv.classList.add('activePlayer');
        this.#domDiv.classList.remove('inactivePlayer');
        const childrenArray = Array.from(this.#domDiv.querySelector('.hitStandDiv').children);
        childrenArray.forEach(child => {
            if(child.classList.contains('hitButton') || child.classList.contains('standButton')) {
                child.removeAttribute('disabled');
            } else if(child.classList.contains('splitButton')) {
                child.removeAttribute('disabled');
            }
        });
    }

    deactivatePlayer() {
        this.#isActive = false;
        this.#domDiv.classList.add('inactivePlayer');
        this.#domDiv.classList.remove('activePlayer');
        const childrenArray = Array.from(this.#domDiv.querySelector('.hitStandDiv').children);
        childrenArray.forEach(child => {
            if(child.classList.contains('hitButton') || child.classList.contains('standButton')) {
                child.setAttribute('disabled', true);
            } else if(child.classList.contains('splitButton')) {
                child.setAttribute('disabled', true);
            }
        });
    }

    addCard(card) {
        this.hand.addCard(card);
        if(this.splitHand !== null && this.#splitButton !== null) {
            //player did not split remove button
            this.#splitButton.remove();
            this.#splitButton = null;
        }
    }

    executeSplitHand() {
        if(this.splitHand === null) {
            this.splitHand = new hand(this.#domDiv);
            this.splitHand.addCard(this.hand.popCard());
            this.useSplitHand = true;
            //player did split remove button
            this.#splitButton.remove();
            this.#splitButton = null;
        } else {
            throw new Error('Player already has a split hand');
        }
    }

    trySplit() {
        if(this.hand.cards.length === 2 && this.hand.cards[0].value === this.hand.cards[1].value) {
            this.executeSplitHand();
        } else {
            throw new Error('Cannot split hand');
        }
    }

    onHit() {
        console.log('hit');
        if(!this.#isActive)
            return;
        console.log('is active');
        console.log(this.useSplitHand);
        if(this.useSplitHand) {
            console.log('using split hand');
            if(!this.splitHand.winningHand && !this.splitHand.bustedHand)
                this.splitHand.addCard(deck.drawCard());
        } else {
            console.log('using main hand');
            console.log('winning handvalue: ' + this.hand.winningHand);
            console.log('busted handvalue: ' + this.hand.bustedHand);
            console.log('boolean statement value: ' + (!this.hand.winningHand && !this.hand.bustedHand));
            if(!this.hand.winningHand && !this.hand.bustedHand)
                this.hand.addCard(new card(1, 1, this.#domDiv));
                //this.hand.addCard(deck.drawCard());
            console.log('added card to hand');
        }
    }

    onStand() {
        if(this.useSplitHand) {
            if(!this.splitHand.winningHand && !this.splitHand.bustedHand)
                this.splitHand.bust();
        } else {
            if(!this.hand.winningHand && !this.hand.bustedHand)
                this.hand.bust();
        }
        playerStood();
    }

    //getter and setter

    get domDiv() {
        return this.#domDiv;
    }
}

const players = [];
players.push(new player('Dealer'));
players.push(new player('Player 1'));

players.forEach(player => {
    player.deactivatePlayer();
});
players[0].activatePlayer();

let activePlayerID = 0;;

//const deck = new deck();

players[activePlayerID]

function playerStood() {
    players[activePlayerID].deactivatePlayer();
    if(activePlayerID === players.length - 1) {
        activePlayerID = 0;
    } else {
        activePlayerID++;
    }
    players[activePlayerID].activatePlayer();
}