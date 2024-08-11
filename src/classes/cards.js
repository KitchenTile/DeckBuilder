import { initialDeckData, rewardCardData } from "../data/cardData";
import {displayRewardCard} from "../UI/cardVisual";
import {cardRewardLogToPrint, logToPrint} from "../UI/displayLogs";


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
            case "draw":
                logToPrint(`${this.title} used!`)

                if (this.title === "Fill Up") {
                    while(target.hand.length < target.handMax + 1) {
                        if (target.deck.length <= target.handMax - target.hand.length) {
                            target.shuffleDeck()
                        }
                        const randomIndex = Math.floor(Math.random() * target.deck.length);
                        const randomCard = target.deck[randomIndex];
                        target.hand.push(randomCard);
                        target.deck.splice(randomIndex, 1);

                    }
                } else {
                    if (target.hand.length < target.handMax) {
                        if (target.deck.length < this.effect) {
                            target.shuffleDeck()
                        }
                        for (let i = 0; i < this.effect; i++) {
                            const randomIndex = Math.floor(Math.random() * target.deck.length);
                            const randomCard = target.deck[randomIndex];
                            target.hand.push(randomCard);
                            target.deck.splice(randomIndex, 1);
                        }

                    } else {
                        logToPrint("Hand is full!")
                        return false; 
                    }

                }
                break;
        }
        return true;
    }
}

let rewardCardList = []; //Empty list for reward cards


//Create cards based on the above array
const createCard = (cardInfo) => {
    return new Card(cardInfo.title, cardInfo.type, cardInfo.effect, cardInfo.legend, cardInfo.energyCost, cardInfo.symbol, cardInfo.img);
}

const populateRewardCardList = () => {
    rewardCardList = rewardCardData.map(card => {
        return createCard(card);
    })
}


export const rewardCard = () => {
    cardRewardLogToPrint("");

    populateRewardCardList();
    displayRewardCard(rewardCardList);


    // get event listeners for each card -- reused part of the code for the game.js event listeners but simplified
    rewardCardList.forEach((_, index) => {
        const cardInstance = document.getElementById(`reward_card_${index}`) 

        const cardHandler = () => { //when we click a card then that card gets added to the deck to be generated next turn
            initialDeckData.push(rewardCardData[index]);
            console.log(rewardCardData[index])
            rewardCardData.splice(index, 1);

            document.querySelector("#card_Reward_Visual").setAttribute("style", "display:none;")
            cardRewardLogToPrint(`${rewardCardData[index].title} aquired`)


        }
        cardInstance.addEventListener("click", cardHandler);
    })

    // const randomRewardCardIndex = Math.floor(Math.random() * rewardCardData.length);
    // const randomCard = rewardCardData[randomRewardCardIndex]
    // rewardCardList.push(createCard(randomCard))
    // console.log(randomCard)
    // cardRewardLogToPrint(`${randomCard.title} aquired`)

    // initialDeckData.push(randomCard);
    // rewardCardData.splice(randomRewardCardIndex, 1);
}


//Add cards to deck and display deck, might change later
export const initDeck = player => {
    initialDeckData.forEach(card => {
        let newCard = createCard(card);
        player.addToDeck(newCard);
    })
    // player.displayDeck();
    // player.getHand();
}