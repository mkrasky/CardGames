const suits = ['spades', 'clubs', 'hearts', 'diamonds']
const value = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
let deck = [];
let dealerHand = [];
let playerHand = [];

function clearBox(elementId) {
    document.getElementById(elementId).innerHTML = '';
}

function createDeck() {

    let tempDeck = [];

    for (let i of suits) {
        
        for (let j of value) {
            let card = {
                Value: j,
                Suit: i
            };
            
            tempDeck.push(card);
            
        }

    }

    for (let x in tempDeck) {
        // console.log(tempDeck)
    }
    return tempDeck;

}

function renderDeck() {
    clearBox('deck');
    for (let i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = "card";
        value.className = "value";
        suit.className = "suit " + deck[i].Suit;

        card.appendChild(value);
        card.appendChild(suit);
        
        document.getElementById("deck").appendChild(card);
        value.innerHTML = deck[i].Value;
    }

}

function shuffleDeck() {

    deck = createDeck();

    for (let i = 0; i < 1000; i++){
    let position1 = Math.floor(Math.random() * deck.length);
    let position2 = Math.floor(Math.random() * deck.length);

    let temp = deck[position1];
    deck[position1] = deck[position2];
    deck[position2] = temp;

    }

    // renderDeck();
}

function dealSetup() {
    playerHand = [];
    dealerHand = [];

    for (let i = 0; i < 2; i++) {

        playerHand.push(deck[0]);
        deck.splice(0,1);

        dealerHand.push(deck[0]);
        deck.splice(0,1);
    }

    clearBox('dealerCards');

    for (let i = 0; i < dealerHand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = 'card';

        if (i == 0) {
            card.className += ' isFlipped';
        } else {
            
            value.className = "value";
            suit.className = 'suit ' + dealerHand[i].Suit;
            value.innerHTML = dealerHand[i].Value;
        }

        
        

        card.appendChild(value);
        card.appendChild(suit);
        
        document.getElementById("dealerCards").appendChild(card);
        

        
    }

    clearBox('playerCards');

    for (let i = 0; i < playerHand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = "card";
        value.className = "value";
        suit.className = "suit " + playerHand[i].Suit;

        card.appendChild(value);
        card.appendChild(suit);
        
        document.getElementById("playerCards").appendChild(card);
        value.innerHTML = playerHand[i].Value;
   
    }

    updatePlayerPoints();

}

function updatePlayerPoints() {

    let playerPoints = 0;

    for (let i = 0; i < playerHand.length; i++) {

        let temp = 0;

        switch (playerHand[i].Value) {
            case 'A':
                temp = 11;
                break;
            case 'K':
                temp = 10;
                break;
            case 'Q':
                temp = 10;
                break;
            case 'J':
                temp = 10;
                break;
            default:
                temp = parseInt(playerHand[i].Value);
                break;
        }

        playerPoints += temp;

    }

    document.getElementById('playerPoints').innerHTML += playerPoints;

}

function updateDealerPoints() {

    let dealerPoints = 0;

    for (let i = 0; i < dealerHand.length; i++) {

        let temp = 0;

        switch (dealerHand[i].Value) {
            case 'A':
                temp = 11;
                break;
            case 'K':
                temp = 10;
                break;
            case 'Q':
                temp = 10;
                break;
            case 'J':
                temp = 10;
                break;
            default:
                temp = parseInt(dealerHand[i].Value);
                break;
        }

        dealerPoints += temp;

    }

    document.getElementById('dealerPoints').innerHTML += dealerPoints;

}

function load() {
    deck = createDeck();
    // renderDeck();
    shuffleDeck();
}

window.onload = load;