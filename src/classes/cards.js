import { logToPrint } from "../main";

// Create a Card class with a couple of properties I felt were appropriate.

export class Card {
    constructor(title, type, effect, legend, energyCost) {
        this.title = title;
        this.type = type;
        this.effect = effect;
        this.legend = legend;
        this.energyCost = energyCost;
    }


    //Method to play a card with a target param, used a switch statement bc it's easier to read than a long if/else chain
    play(target) {
        switch (this.type){
            case "attack":
                logToPrint(`${this.title} used!`)
                const random = Math.random();
                if (random  >=  target.dodgeChance) { // if a random number between 0 and 1 is over or equal the enemies dodgeChance number, perform attack.
                    target.health += this.effect;
                    logToPrint(`${target.name} took ${this.effect * -1} damage`);
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
                if (target.health + this.effect > 100){
                    target.health = 100;
                } else {
                    target.health += this.effect;
                }
                break;
        }
        return true;
    }
}


//Array of cards to add to the deck
 const cardData = [
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},

    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},

    {title: "Chicken Leg", type: "charger", effect: 3, legend: "A healthy dose of protein", energyCost: 1},
    {title: "Chicken Leg", type: "charger", effect: 3, legend: "A healthy dose of protein", energyCost: 1},
    
    {title: "Fried Crickets", type: "charger", effect: 1, legend: "A fair dose of protein", energyCost: 0},
    {title: "Fried Crickets", type: "charger", effect: 1, legend: "A fair dose of protein", energyCost: 0},
];

//Create cards based on the above array
export const createCard = (cardInfo) => {
    return new Card(cardInfo.title, cardInfo.type, cardInfo.effect, cardInfo.legend, cardInfo.energyCost);
}


//Add cards to deck and display deck, might change later
export const initDeck = player => {
    cardData.forEach(card => {
        let newCard = createCard(card);
        player.addToDeck(newCard);
    })
    player.displayDeck();
    player.getHand();
}

