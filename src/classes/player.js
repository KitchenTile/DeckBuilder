
import {logToPrint} from "../UI/displayLogs";

//Created a player class with a couple of properties I thought were appropriate,
//Will probalby change a lot of this later on
export default class Player {
    constructor(name) {
        
        //My constructor has a name, max and current health, the players current map tile, starting and current armor
        //deck, hand, discard pile and items array, starting and current energy, max hand size and images for differnet states.

        this.name = name;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.currentTile = 0;
        this.startingArmor = 0;
        this.armor = this.startingArmor;
        this.deck = [];
        this.cash = 0;
        this.items = [];
        this.startingEnergy = 3;
        this.energy = this.startingEnergy;
        this.hand = [];
        this.handMax = 5;
        this.discardPile = [];
        this.imgSrc = "../src/images/Assets/Assets_cleaner_1.png";
        this.winImgSrc = "../src/images/Assets/Assets_cleaner_win.png";
        this.loseImgSrc = "../src/images/Assets/Assets_cleaner_loss.png";
    }


    //Method to use cards
    useCard(title, target) {
        const cardIndex = this.hand.findIndex(card => card.title === title); //Find the first card of which title matches with our title.
        if (cardIndex !== -1){ // if it exists and the energy costs is equal or less than our energy amount, play and delete the card from our deck.
            const card = this.hand[cardIndex];
            if (this.energy >= card.energyCost){
                const canUse = card.play(target); // canUse checks if the card effect can be applied to the target
                if (canUse) {
                    this.energy -= card.energyCost;
                    this.hand.splice(cardIndex, 1);
                    this.discardPile.push(card);
                }
                this.displayHand();
            } else {
                logToPrint("Not enough energy!")
            }
        } else {
            logToPrint("Card not in hand!")
        }
    }

    //Method to add card to deck
    addToDeck(card) {
        this.deck.push(card);
    }

    //currently unused but usefull to have?
    //Method to display the deck in the terminal
    displayDeck() {
        console.log(`////////////////////////////////////`);
        console.log("Cards in deck: ")
        this.deck.forEach(card => {
            console.log(`-- ${card.title} - Energy Cost: ${card.energyCost}`)
        })
        console.log(`////////////////////////////////////`);
    }

    // display common stats in the terminal
    displayStats() {
        console.log(`////////////////////////////////////`);
        console.log(`Player Health: ${this.health}`);
        console.log(`Player armor: ${this.armor}`);
        console.log(`Energy left: ${this.energy}`);
        console.log(`////////////////////////////////////`);
    }

    // Method to add random cards from the deck to the hand and remove them from the deck
    getHand() {
        while (this.hand.length < this.handMax) {
            if (this.deck.length > 0){ // if the deck is not empty put cards from deck randomly into the hand
                const random = Math.floor(Math.random() * this.deck.length);
                const randomCard = this.deck[random];
                this.hand.push(randomCard);
                this.deck.splice(random, 1);
            } else { // if the deck is empty, dump the cards from the discard pile into the deck - I could use a different method for this maybe
                this.shuffleDeck();
            }
        }
        this.displayDeck();
        this.displayHand();
    }

    shuffleDeck() {
        console.log("Shuffling...")
        this.discardPile.forEach(card => {
            this.deck.push(card);
        })
        this.displayDeck();
        this.discardPile = [];
    }

    discardHand() {
        this.hand.forEach(card => {
            this.discardPile.push(card);
        })
        this.hand= [];
        console.log("discarding hand...")
    }

    //Display the hand in the terminal
    displayHand() {
        console.log(`////////////////////////////////////`);
        console.log("Cards in hand: ")
        this.hand.forEach(card => {
            console.log(`-- ${card.title} - Energy Cost: ${card.energyCost}`)
        })
        console.log(`////////////////////////////////////`);
    }
    
    //Save score to be displayed in the scoreboards.
    saveScore(user) {
        const currentUser = JSON.parse(localStorage[user]);
        currentUser.score = this.cash;

        localStorage.setItem(user, JSON.stringify(currentUser));

        console.log(currentUser);
    }
}