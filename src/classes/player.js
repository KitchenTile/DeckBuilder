export default class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.position = {x:0, y:0};
        this.armor = 0;
        this.deck = [];
        this.cash = 0;
        this.items = [];
        this.energy = 3;
    }

    useCard(card, target) {
        if (this.energy >= card.energyCost){
            card.play(target);
            this.energy -= card.energyCost;
        } else {
            console.log("Not enough energy!")
        }
    }

    addToDeck(card) {
        this.deck.push(card);
    }
}