export class Card {
    constructor(title, type, effect, legend, energyCost) {
        this.title = title;
        this.type = type;
        this.effect = effect;
        this.legend = legend;
        this.energyCost = energyCost;
    }

    // get legend() {
    //     return this.legend;
    // }

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

 const cardData = [
    {title: "Slash", type: "attack", effect: -10, legend: "A deadly slash", energyCost: 2},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes", energyCost: 1},
    {title: "Chicken Leg", type: "charger", effect: 2, legend: "A healthy dose of protein", energyCost: 0},

];

export const createCard = (cardInfo) => {
    return new Card(cardInfo.title, cardInfo.type, cardInfo.effect, cardInfo.legend, cardInfo.energyCost);
}

export const initDeck = player => {
    cardData.forEach(card => {
        let newCard = createCard(card);
        player.addToDeck(newCard);
        console.log(newCard.title);
    })
}