import cardData from "../data/cardData";
import logToPrint from "../UI/displayLogs";

// Create a Card class with a couple of properties I felt were appropriate.

export class Card {
    constructor(title, type, effect, legend, energyCost, symbol, img) {
        this.title = title;
        this.type = type;
        this.effect = effect;
        this.legend = legend;
        this.energyCost = energyCost;
        this.symbol = symbol;
        this.img = img;
    }


    //Method to play a card with a target param, used a switch statement bc it's easier to read than a long if/else chain
    play(target) {
        switch (this.type){
            case "attack":
                console.log(`${this.title} used!`)
                const random = Math.random();
                if (random  >=  target.dodgeChance) { // if a random number between 0 and 1 is over or equal the enemies dodgeChance number, perform attack.
                    target.health -= this.effect;
                    logToPrint(`${target.name} took ${this.effect} damage`);
                } else {
                    logToPrint(`${target.name} dodged the attack!`);
                }
                break;

            case "defense":
                if (typeof target.armor === "number"){
                    target.armor += this.effect;
                    logToPrint(`${this.title} used!`)
                } else {
                    logToPrint("Can't use this card on this target!") //- needs fix - card still gets deleted from the deck
                    return false; 
                }
                break;

            case "charger":
                logToPrint(`${this.title} used!`)
                target.energy += this.effect;
                if (target.health + this.effect > target.maxHealth){
                    target.health = target.maxHealth;
                } else {
                    target.health += this.effect;
                }
                break;
        }
        return true;
    }
}


//Create cards based on the above array
export const createCard = (cardInfo) => {
    return new Card(cardInfo.title, cardInfo.type, cardInfo.effect, cardInfo.legend, cardInfo.energyCost, cardInfo.symbol, cardInfo.img);
}


//Add cards to deck and display deck, might change later
export const initDeck = player => {
    cardData.forEach(card => {
        let newCard = createCard(card);
        player.addToDeck(newCard);
    })
    // player.displayDeck();
    // player.getHand();
}