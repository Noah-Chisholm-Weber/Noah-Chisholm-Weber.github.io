class card {
    static idGen = 0;
    #cardId;
    #cardElement;

    constructor(suit, value) {
        // These should be private, to fix later
        this.suit = suit;       // 0 = spades, 1 = hearts, 2 = diamonds, 3 = diamonds
        this.value = value > 11 ? value + 1 : value;
        this.icon = 127137 + (suit * 16) + this.value;
        this.color = (suit === 0 || suit === 3) ? 'black' : 'red';
        //private "helper" method
        this.#cardId = card.idGen++;
        this.#makeCardElement();
    }

    #makeCardElement() {
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

const deck = [];
for(let suit = 0; suit < 4; suit++){
    for(let value = 0; value < 14; value++){
        deck.push(new card(suit,value));
    }
}

for(let i = deck.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
}

let cardTable = document.getElementById('cardTable');
function dealCard() {
    let card = deck.pop();
    if(card)
        cardTable.appendChild(card.cardElement);
}