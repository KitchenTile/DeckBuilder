//Create a game class to manage turn based logic

import displayCard from "../UI/cardVisual";
import logToPrint from "../UI/displayLogs";
import { updateUI } from "../main";
import { initDeck } from "./cards";

export default class Game  {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.state = "";
    }

    start() {
        this.state = "PLAYER_TURN";
        // this.loop();
        initDeck(this.player);
        updateUI();
    }

    loop() {
        switch(this.state) {
            case "PLAYER_TURN":
                this.playerTurn();
                break;
            case "ENEMY_TURN":
                this.enemyTurn();
                break;
            case "GAME_OVER":
                this.gameOver();
                break;
        }
    }

    playerTurn() {
        this.player.armor = 0;
        this.player.energy = 3;
        this.player.getHand();
        updateUI();
    }

    enemyTurn() {
        this.enemies.forEach(enemy => {
            if (enemy.isAlive) {
                enemy.turn(this.enemies, this.player);
            }
        });
        this.state = "PLAYER_TURN"
        updateUI();
        this.loop();

    }

    endTurn() {
        this.player.discardHand();
        this.state = "ENEMY_TURN";
        updateUI();
        this.loop();
    }

    gameOver() {
        console.log("Game Over")
        console.log(`${this.player.name}'s cashed out at: ${this.player.cash} money`);
        logToPrint(`GAME OVER - ${this.player.name} cashed out at ${this.player.cash} money`);
    }

    addEventListeners() {
        let selectedCard
        let selectedCardElement
        let selectedTarget

        this.player.hand.forEach((card, index) => {
            const cardInstance = document.getElementById(`card_${index}`); //put card instances in a variable
            cardInstance.addEventListener("click", () => { //if you click on a card then...
                if (selectedCardElement) {
                    selectedCardElement.style.border = ""; 
                }
                selectedCardElement = cardInstance;
                selectedCardElement.style.border = "2px solid yellow";
                
                selectedCard = card; //select it a card, selecting an attack will give it a yellow border, if a card is selected, it takes the yellow border away from previous cards

                if (selectedCard.type === "attack") { // if it's an attack then...
                    this.enemies.forEach((enemy, index) => { //put enemy instances in a variable
                        const enemyInstance = document.getElementById(`enemy_${index}`);
                        enemyInstance.addEventListener("click", () => { //click an enemy 
                            if (enemy.isAlive) { //if it's alive
                                selectedTarget = enemy; //select it 
                                this.player.useCard(selectedCard.title, selectedTarget); // use the card on the selected enemy
                                updateUI(); //update stats, cards and event listeners
                            } else {
                                console.log(`${enemy.name} can't be targeted! Try again`)
                            }
                        });
                    })
                } else { // if it's not an attack
                    this.player.useCard(card.title, this.player) // use card on yourself
                    updateUI()
                    // do the same as if it was an attack
                }
            })    
        })
    }
}