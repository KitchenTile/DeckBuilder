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
                target.health += this.effect;
                break;
            case "defense":
                target.armor += this.effect;
                break;
            case "charger":
                target.energy += this.effect;
                target.health += this.effect;
                break;
        }
    }
}


//Array of cards to add to the deck
 const cardData = [
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},

    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},

    {title: "Chicken Leg", type: "charger", effect: 2, legend: "A healthy dose of protein", energyCost: 0},

];

//Create cards based on the above array
export const createCard = (cardInfo) => {
    return new Card(cardInfo.title, cardInfo.type, cardInfo.effect, cardInfo.legend, cardInfo.energyCost);
}


//Add cards to deck, might change later
export const initDeck = player => {
    cardData.forEach(card => {
        let newCard = createCard(card);
        player.addToDeck(newCard);
    })
}