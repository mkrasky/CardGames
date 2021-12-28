const suits = ['spades', 'clubs', 'hearts', 'diamonds']
const value = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
let deck = [];
let dealerHand = [];
let playerHand = [];

// Function to clear all things inside a HTML object.
function clearBox(elementId) {
    document.getElementById(elementId).innerHTML = '';
}

// Populates the tempDeck array with card objects and returns tempDeck.
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

    return tempDeck;

}

// ONLY USED FOR TESTING!!!! Renders all cards in the deck of 52 cards.
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

// Calls createDeck function to reset deck to 52 cards and shuffles the order.
function shuffleDeck() {

    deck = createDeck();

    for (let i = 0; i < 1000; i++){
    let position1 = Math.floor(Math.random() * deck.length);
    let position2 = Math.floor(Math.random() * deck.length);

    let temp = deck[position1];
    deck[position1] = deck[position2];
    deck[position2] = temp;

    }

}

// This is used only for the initial deal.
function dealSetup() {

    // Resets player and dealer's hands.
    playerHand = [];
    dealerHand = [];

    // Adds first card from deck to players hand then removes it from the deck and does the same for the dealer.
    for (let i = 0; i < 2; i++) {

        playerHand.push(deck[0]);
        deck.splice(0,1);

        dealerHand.push(deck[0]);
        deck.splice(0,1);
    }

    // Clears dealerCard area of the HTML.
    clearBox('dealerCards');

    // Adds div's for each card and displays the value and suit of the card except the first one dealt to the dealer which displays a card back img.
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

    // Clears playerCards area of the HTML.
    clearBox('playerCards');

    // Adds div's for each card and displays the suit and value of the cards in the players hand.
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

    // Updates player points after intial deal.
    updatePlayerPoints();

}

// Function to count the number that the player's cards add up to.
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

// Function to add the points of the cards in the dealer's hand, this should only be called once the face down card is flipped over.
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

// Calls functions necessary at the first load of the website.
function load() {
    deck = createDeck();
    shuffleDeck();
}

window.onload = load;