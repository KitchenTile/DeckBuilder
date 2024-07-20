//Create a game class to manage turn based logic
import logToPrint from "../UI/displayLogs";
import enemyData from "../data/enemyData";
import { updateUI } from "../main";
import { initDeck } from "./cards";
import { Bandit, Mage } from "./enemies";

export default class Game  {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.state = "";
    }

    startScreen() {

    }

    winScreen(enemyList) { //function to update the cash and display message when all enemies are dead;
        let deadCount = 0 //keep couont of the dead enemies
        enemyList.forEach(enemy => {
            if (!enemy.isAlive) {
                deadCount += 1; 
            }
        })

        if (deadCount === enemyList.length) { // if the deadcount is the same as the length of a list passed by (in fight enemy list), add cash and update UI
            const cashPrize = 5 + Math.floor(Math.random() * 5);
            console.log(cashPrize)
            this.player.cash += cashPrize;
            logToPrint(`${this.player.name} won this fight, $${cashPrize} earned!`);
            console.log(`${this.player.name} won this fight, $${cashPrize} earned!`);
        }
    }

    start() {
        this.state = "PLAYER_TURN";
        // this.loop();
        initDeck(this.player);
        this.enemies.forEach(enemy => {
            enemy.decideNextMove(this.enemies, this.player); // determine next enemy's first turn move
        })
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


    enemyTurn() { //for each enemy play their turn, switch to player turn and update the UI
        this.enemies.forEach(enemy => {
            if (enemy.isAlive) {
                enemy.turn(this.enemies, this.player)
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

    //Need to re write this function it's too messy
    addEventListeners() {
        let selectedCard
        let selectedCardElement
        let selectedTarget

        this.player.hand.forEach((card, index) => {
            const cardInstance = document.getElementById(`card_${index}`); //put card instances in a variable
            cardInstance.addEventListener("click", () => { //if you click on a card then...
                if (selectedCardElement) {
                    selectedCardElement.style.animation = ""; 
                }
                selectedCardElement = cardInstance;
                selectedCardElement.style.animation = "glow 2s infinite"; // this animation looks nicer than what I did before
                
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

//These functions were previously in main.js but I think they belong here

//Grab the list of enemies and create a new list with enemy instances according to their type
const enemyListGen = () => {
    const enemyList = [];
    enemyData.forEach(enemy => {
    switch (enemy.type) {
        case "Mage":
        const mage = new Mage(enemy.name, enemy.img);
        enemyList.push(mage);
        break;
        case "Bandit":
        const bandit = new Bandit(enemy.name);
        enemyList.push(bandit);
    }
    })
    return enemyList;
}

const randomEnemies = () => { //function that decides how many enemies will be on a fight at random
    const inFightEnemies = [];
    const enemyList = enemyListGen();
    const random = Math.floor(Math.random() * 3) + 1; //random number between 1 and 3 to avoid empty fights
    for (let i = 0; i < random; i++) {
    const randomEnemy = Math.floor(Math.random() * enemyList.length)
        inFightEnemies.push(enemyList[randomEnemy]);  //Choose and push random enemy
        enemyList.splice(enemyList[randomEnemy], 1); //Delete that enemy from the array so it can't get chosen again
    }
    return inFightEnemies;
}


export {Game, randomEnemies};