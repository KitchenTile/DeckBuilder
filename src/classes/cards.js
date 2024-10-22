import { cardTypeList, initialDeckData, rewardCardData } from "../data/cardData";
import {displayRewardCard} from "../UI/cardRewardDisplay";
import upgradeCardDisplay from "../UI/cardUpgradeDisplay";
import {cardRewardLogToPrint, cardUpgradeLogToPrint, logToPrint} from "../UI/displayLogs";


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

                if (this.title === "Care Package") { // Edge case for care package giving the player the amount of  cards it takes to fill up their hand
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
    cardRewardLogToPrint(""); // if I dont change this to an empty string it doens't update in the handler function

    populateRewardCardList();
    displayRewardCard(rewardCardList);


    // get event listeners for each card -- reused part of the code for the game.js event listeners but simplified
    rewardCardList.forEach((_, index) => {
        const cardInstance = document.getElementById(`reward_card_${index}`) 

        const cardHandler = () => { //when we click a card then that card gets added to the deck to be generated next turn
            initialDeckData.push(rewardCardData[index]);
            console.log(rewardCardData[index])
            console.log(rewardCardData[index].title)

            document.querySelector("#card_Reward_Visual").setAttribute("style", "display:none;")
            cardRewardLogToPrint(`${rewardCardData[index].title} aquired`)
            rewardCardData.splice(index, 1);

        }
        cardInstance.addEventListener("click", cardHandler);
    })
}

// function to upgrade cards by changing the initialDeckData array
export const upgradeCard = () => {

    let unupgraededCardTypeList = [] //creates a new array to store the types that have not been upgraded
    cardUpgradeLogToPrint(""); // if I dont change this to an empty string it doens't update in the handler function



    cardTypeList.forEach(card => {
        if(card.upgraded === false) { //if the card type is not upgraded 
            console.log(card.type)
            unupgraededCardTypeList.push(card); //push it into the list
        }
    })
    upgradeCardDisplay(unupgraededCardTypeList); //create buttons for the unupgraded card types

    unupgraededCardTypeList.forEach((card, index) => { 
        const buttonInstance = document.getElementById(`type_button_${index}`); 

        const upgradeHandler = () => { //event listener function to upgrade the cards title and effect of the type selected
            initialDeckData.forEach(deckCard => {
                if(deckCard.type === card.type) { //if the card type is the same as the type selected
                    deckCard.title += "+"; //add a + in the title
                    if (card.type === "draw") { // if the card type is draw
                        deckCard.energyCost -= 1; // reduce the energy cost of the card by 1
                    } else {
                        deckCard.effect += 2; //Add 2 to the effect
                    }
                }
            })
            card.upgraded = true; //set the upgraded property of card in cardTypeList to true so next time it doesn't appear as an option to upgrade.
            document.querySelector("#upgradeCardVisual").setAttribute("style", "display:none;") // hide the buttons when the function runs

            cardUpgradeLogToPrint(`${card.type} cards upgraded!`) // log message
        }


        buttonInstance.addEventListener("click", upgradeHandler);
    })

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