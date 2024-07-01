//Created a player class with a couple of properties I thought were appropriate,
//Will probalby change a lot of this later on

export default class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.position = {x:0, y:0};
        this.armor = 0;
        this.deck = [];
        this.cash = 0;
        this.items = [];
        this.energy = 10;
    }


    //Method to use cards
    // useCard(card, target) {
    //     if (this.energy >= card.energyCost){
    //         card.play(target);
    //         this.energy -= card.energyCost;
    //         console.log(`${card.title} used!`)
    //         let cardIndex = this.deck.indexOf(card);
    //         this.deck.splice(cardIndex, 1);
    //         this.displayDeck();
    //     } else {
    //         console.log("Not enough energy!")
    //     }
    // }

    useCard(title, target) {
        const cardIndex = this.deck.findIndex(c => c.title === title); //Make a quick method to find the first card of which title matches with our title.
        if (cardIndex !== -1){ // if it exists and the energy costs is equal or less than our energy amount, play and delete the card from our deck.
            const card = this.deck[cardIndex];
            if (this.energy >= card.energyCost){
                card.play(target);
                this.energy -= card.energyCost;
                console.log(`${card.title} used!`)
                this.deck.splice(cardIndex, 1);
                this.displayDeck();
            } else {
                console.log("Not enough energy!")
            }
        } else {
            console.log("Card not on deck!")
        }
    }

    //Method to add card to deck
    addToDeck(card) {
        this.deck.push(card);
    }

    //Method to display the deck
    displayDeck() {
        console.log("Cards in deck: ")
        this.deck.forEach(card => {
            console.log(card.title)
        })
    }
}