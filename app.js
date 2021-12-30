const suits = ['spades', 'clubs', 'hearts', 'diamonds']
const value = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerPoints = 0;
let playerPoints = 0;

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

    // Resets player and dealer's hands and deck.
    playerHand = [];
    dealerHand = [];
    dealerPoints = 0;
    playerPoints = 0;

    deck = createDeck();
    shuffleDeck();
    
    document.getElementById('dealerPoints').innerHTML = 'Points: ';
    document.getElementById('playerPoints').innerHTML = 'Points: ';

    // Adds first card from deck to players hand then removes it from the deck and does the same for the dealer.
    for (let i = 0; i < 2; i++) {

        playerHand.push(deck[0]);
        deck.splice(0,1);

        dealerHand.push(deck[0]);
        deck.splice(0,1);
    }

    // Clears dealerCard area of the HTML.
    clearBox('dealerCards');

    // Adds div's for each card and displays the value and suit of the card except the second one dealt to the dealer which displays a card back img.
    for (let i = 0; i < dealerHand.length; i++) {

        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = 'card';

        if (i == 1) {

            card.id = 'isFlipped';

        } else {
            
            value.className = "value";
            suit.className = 'suit ' + dealerHand[i].Suit;
            value.innerHTML = dealerHand[i].Value;
            card.appendChild(value);
            card.appendChild(suit);

        }
        
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

// Function to check if card should display the back of the card.
function flipCard() {

    document.getElementById('isFlipped').remove();

    let card = document.createElement('div');
    let value = document.createElement("div");
    let suit = document.createElement("div");

    card.className = "card";
    value.className = "value";
    suit.className = "suit " + dealerHand[1].Suit;

    card.appendChild(value);
    card.appendChild(suit);
        
    document.getElementById("dealerCards").appendChild(card);
    value.innerHTML = dealerHand[1].Value;
}

// Function to count the number that the player's cards add up to.
function updatePlayerPoints() {

    playerPoints = 0;

    for (let i = 0; i < playerHand.length; i++) {

        switch (playerHand[i].Value) {
            case 'A':
                playerPoints += 11;
                break;
            case 'K':
                playerPoints += 10;
                break;
            case 'Q':
                playerPoints += 10;
                break;
            case 'J':
                playerPoints += 10;
                break;
            default:
                playerPoints += parseInt(playerHand[i].Value);
                break;
        }

    }

    // This for loop is to let the A's be equal to 11 unless the points go over 21 then it will be equal to 1.
    for (let i = 0; i < playerHand.length; i++) {
        if (playerPoints > 21 && playerHand[i].Value == 'A') {
            playerPoints = playerPoints - 10;
        }
    }

    document.getElementById('playerPoints').innerHTML = `Points: ${playerPoints}`;

}

// Function to add the points of the cards in the dealer's hand, this should only be called once the face down card is flipped over.
function updateDealerPoints() {

    dealerPoints = 0;

    for (let i = 0; i < dealerHand.length; i++) {

        switch (dealerHand[i].Value) {
            case 'A':
                dealerPoints += 11;
                break;
            case 'K':
                dealerPoints += 10;
                break;
            case 'Q':
                dealerPoints += 10;
                break;
            case 'J':
                dealerPoints += 10;
                break;
            default:
                dealerPoints += parseInt(dealerHand[i].Value);
                break;
        }

    }

    document.getElementById('dealerPoints').innerHTML += dealerPoints;

}

// Function for when player clicks the Hit! button.
function hitPlayer() {
    playerHand.push(deck[0]);
    deck.splice(0,1);
    document.getElementById('playerPoints').innerHTML = 'Points: ';

    updatePlayerPoints();
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

    if (playerPoints > 21) {
        dealerTurn();
    }
}

// Function for if the dealer needs to hit.
function hitDealer() {

    dealerHand.push(deck[0]);
    deck.splice(0,1);
    document.getElementById('dealerPoints').innerHTML = 'Points: ';

    updateDealerPoints();
    clearBox('dealerCards');

    for (let i = 0; i < dealerHand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");

        card.className = "card";
        value.className = "value";
        suit.className = "suit " + dealerHand[i].Suit;

        card.appendChild(value);
        card.appendChild(suit);
        
        document.getElementById("dealerCards").appendChild(card);
        value.innerHTML = dealerHand[i].Value;
   
    }

}

// Function for when the player clicks the stand button.
function standPlayer() {
    dealerTurn();
}

// Function to hold the Dealer logic. (Or to start their turn.)
function dealerTurn() {
    flipCard();
    updateDealerPoints();

    while (dealerPoints < 17 && dealerPoints < playerPoints && playerPoints <= 21) {
        hitDealer();
    }
}

// Calls functions necessary at the first load of the website.
function load() {
    deck = createDeck();
    shuffleDeck();
    dealSetup();
}

window.onload = load;
