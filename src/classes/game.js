//Create a game class to manage turn based logic

//{** IMPORTS **}
import logToPrint from "../UI/displayLogs";
import displayMap from "../UI/mapVisual";
import enemyData from "../data/enemyData";
import mapData from "../data/mapData";
import subsequentBattles, { updateUI } from "../main";
import { initDeck } from "./cards";
import { Bandit, Mage } from "./enemies";


export default class Game {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.state = "";
        this.eventHandlers = { // after not being able to get the event listener removers right for hours, I looked it up and found this solution
            // I create an object to hold the event listener and the element that event listener is acting on. This way the game knows exactly what and where
            // I'm referencing thigs
            card: [], //these will get passed to the object with the element being affected and the function that handles the interaction
            enemy: [], // when we want the interaction to be removed then we remove the event listeners with removeEventListeners() and we parse the empty object again
            tile: [],
            endButton: null, //This is the only way I can take the event listeners away and put them back properly every time I update the UI
        };
    }

    winScreen(enemyList) { //function to update the cash, display message when all enemies are dead and update map;
        let deadCount = 0; //keep track of the dead enemies
        enemyList.forEach((enemy) => {
            if (!enemy.isAlive) {
                deadCount += 1;
            }
        });

        if (deadCount === enemyList.length) { //if dead enemies is equal to the length of the enemy list (meaning all enemies are dead)
            const cashPrize = 5 + Math.floor(Math.random() * 5); // generate a random amount between 5 and 9
            this.player.cash += cashPrize; // add cash to the variable holding the cash
            console.log("ALL ENEMIES DEAD, GOING TO THE NEXT TILE")
            logToPrint(`${this.player.name} won this fight, $${cashPrize} earned!`); //print a message to the screen
            this.player.currentTile++; // go up a tile so we can move on to the next stage
            this.updateMap(); 
            this.removeAllEventListeners();

            //{** END SCREEN CALL **}
            this.screenDisplay("endScreen");


            // {** MAP TILES EVENT LISTENER **}  //adding an event listener after the battle is over allows us to click the next fight
            this.addMapEventListeners();
        }
    }

    start() { //fucntion run at the start of the game
        console.log("game Started")
        this.restartDeck();
        initDeck(this.player); //get a deck for player
        this.enemies.forEach((enemy) => {
            enemy.decideNextMove(this.enemies, this.player); // for each enemy in battle decide next move
        });
        displayMap(this.player.currentTile); // display map, needs some fixing
        this.addEventListeners();
        updateUI();
        if (this.player.currentTile > 0) { //I have to add this here because if I don't the state doesn't change after I select a new tile
            this.state = "PLAYER_TURN"
        }

        this.playerTurn(); //This doesn't work like i'd like to

    }

    restartDeck() { // fuction that resets the deck hand and discad pile so cards don't stack up after every fight
        this.player.deck = [];
        this.player.hand = [];
        this.player.discardPile = []; 
    }

    loop() { //loop function to keep turns and event handlers on check
        switch (this.state) {
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

    playerTurn() { // fuction that gets called every time it's the players turn, it resets the hand, armor and energy
        console.log("NEW PLAYER TURN")
        this.player.armor = 0;
        this.player.energy = 3;
        this.player.getHand();
        updateUI();
    }

    enemyTurn() { //function that gets called after the player's turn finishes
        this.enemies.forEach((enemy) => {
            if (enemy.isAlive) {
                enemy.turn(this.enemies, this.player); //if the enemy is alive then play their turn
            }
        });
        this.state = "PLAYER_TURN"; //and go back to player's turn function
        updateUI();
        this.loop();
    }

    endTurn() { //function that plays after the player hits the end turn button, discards hand and sets the turn to enemy
        this.player.discardHand();
        this.state = "ENEMY_TURN";
        updateUI();
        this.loop();
    }

    gameOver() { //game over function currently only displays message 
        this.screenDisplay("endScreen");
        logToPrint(`GAME OVER - ${this.player.name} cashed out at ${this.player.cash} money`);
    }

    screenDisplay(state) { 
        switch (state) {
            case "endScreen": // Change the div's styling to display the logs in the middle of the screen in a larger font
                document.querySelector(".top_bit").setAttribute("style", "flex-direction:row; background:black"); // I use .setAttribute instead of .style because flex-drection doesn't work with .style
                document.querySelector("#enemy").style.display = "none";
                document.querySelector("#logs").setAttribute("style", "font-size:40px;width:100%");
                break;
            case "restartScreen": // Change the div's styling to undo endScreen changes
                document.querySelector(".top_bit").setAttribute("style", "flex-direction:column; background-image: url('../src/images/Background.jpeg'); flex-direction: column; background-repeat: no-repeat; background-size: 100%; align-items: center;");
                document.querySelector("#enemy").style.display = "flex";
                document.querySelector("#logs").setAttribute("style", "font-size:24px;");

        }

    }
 

    addEventListeners() { // event listener adder function -- should probably re name it to avoid confusion?
        this.removeAllEventListeners(); //remove all event listeners in place, since this function gets called every time the UI updates
        // if we don't do this event listeners stack on top of each other and when we click on one, several event handlers trigger

        if (this.state === "PLAYER_TURN") { //this acts as a filter to when we can use sertain event listeners -- in this case, only use these when
            // the game state is on players turn. If we don't do this, then we would be able to select cards or move turns when we're not supposed to,
            // i.e when the battle is over 

            // {** CARDS EVENT LISTENER **}
            console.log("event listeners added")
            this.player.hand.forEach((card, index) => { //for each card in the player's hand
                const cardInstance = document.getElementById(`card_${index}`); //get the DOM element in a variable
                const cardHandler = (event) => this.handleCardClick(event, cardInstance, card); // put the handler function in a variable
                cardInstance.addEventListener("click",  cardHandler); //create event listener for the element and the handler
                this.eventHandlers.card.push({ element: cardInstance, handler: cardHandler }); // put both in the event handler object to keep track of active listeners
                // console.log(this.eventHandlers.card)
            });

            // {** ENDBUTTON EVENT LISTENER **}

            //basically the same thing but with the end turn button
            const endButton = document.getElementById("endButton");
            const endTurnHandler = () => this.endTurn();
            endButton.addEventListener("click", endTurnHandler);
            this.eventHandlers.endButton = { element: endButton, handler: endTurnHandler };
            // console.log(this.eventHandlers.endButton)

        } else {

            // {** MAP TILES EVENT LISTENER **}
            this.addMapEventListeners();
        }
    }

    addMapEventListeners() {
        mapData.forEach((_, index) => { //same thing with card
            const tileInstance = document.getElementById(`tile_${index}`);
            const tileHandler = () => this.handleTileClick(index);
            tileInstance.addEventListener("click", tileHandler);
            this.eventHandlers.tile.push({ element: tileInstance, handler: tileHandler });
            console.log(tileInstance)
        });
    }

    removeAllEventListeners() { // function to remove all event listeners

        // {** END BUTTON EVENT REMOVER **}
        if (this.eventHandlers.endButton) { // since the button event listener is a single instance we don't *have* use an array (but we could)
            this.eventHandlers.endButton.element.removeEventListener("click", this.eventHandlers.endButton.handler); // if there is something stored in the eventhandler.endbutton variable, then remove the event listener
            // console.log(`REMOVED: ${this.eventHandlers.endButton }`)
        }

        // {** CARDS EVENT REMOVER **}
        this.eventHandlers.card.forEach(({ element, handler }) => { // for each element stored in the eventHandler.card list, grab the element and handler and remove the event listener (calling the handler) from the element
            element.removeEventListener("click", handler);
        });

        // {** MAP TILES EVENT REMOVER **}
        this.eventHandlers.tile.forEach(({ element, handler }) => { //same as card
            element.removeEventListener("click", handler);
        });

        this.eventHandlers = { // set the even handlers object back to empty
            card: [],
            enemy: [],
            tile: [],
            endButton: null,
        };
    }

    handleCardClick(event, cardInstance, card) {  //we need event otherwise we get undefined error
        if (this.selectedCardElement) {
            this.selectedCardElement.style.animation = ""; // explanation below
        }
        this.selectedCardElement = cardInstance; //selected card element and selected card are technically the same, the difference is that we use 
        this.selectedCardElement.style.animation = "glow 2s infinite"; // element for pointing at the element isntace to apply styling
        this.selectedCard = card; //card to select the card object to play it, we use selected card for everything but styling

        if (this.selectedCard.type === "attack") { //if the card is an attack
            this.enemies.forEach((enemy, index) => { // for each enemy in the battle
                const enemyInstance = document.getElementById(`enemy_${index}`); //asign it's element to a variable
                const enemyHandler = () => this.handleEnemyClick(enemy); //get a handler function for selecting them
                enemyInstance.addEventListener("click", enemyHandler); //add event handler for the element and function
                this.eventHandlers.enemy.push({ element: enemyInstance, handler: enemyHandler}); // put both in the event handler object to keep track of active listeners
            });
        } else {
            this.player.useCard(card.title, this.player); // if it's not an attack use the card on self
            updateUI();
        }
    }

    handleEnemyClick(enemy) { //function we use to select an enemy
        if (enemy.isAlive) {
            this.player.useCard(this.selectedCard.title, enemy); //if it's alive then play the card on them
            updateUI();
        } else {
            console.log(`${enemy.name} can't be targeted! Try again`); // else display a message
        }
    }

    handleTileClick(index) { //function we use to start a fight if the map tile we click is the same as the tile we are in
        if (index === this.player.currentTile) {
            if (index === 0) {
                this.startFight();
            }
            console.log("tile clicked")
            console.log("Current Tile " + index)

            document.getElementById(`tile_${index}`).style.background = "yellow";
            if (index > 0) {
                // document.getElementById(`tile_${index}`).style.background = "yellow";
                subsequentBattles(this.player)
                this.screenDisplay("restartScreen")
                this.startFight();
            }
        }
    }

    startFight() { //start the fight by switching the game state
        this.state = "PLAYER_TURN";
        console.log(this.state)
        updateUI();
        console.log("Start fight")

    }

    updateMap() {  //update map work i n progress
        if (this.player.currentTile < mapData.length) {
            mapData[this.player.currentTile - 1].completed = true;
            displayMap(this.player.currentTile);
        } else {
            this.gameOver();
        }
    }
}

// //These functions were previously in main.js but I think they belong here

// //Grab the list of enemies and create a new list with enemy instances according to their type
const enemyListGen = () => {
    const enemyList = [];
    enemyData.forEach((enemy) => {
        switch (enemy.type) {
            case "Mage":
                const mage = new Mage(enemy.name, enemy.img);
                enemyList.push(mage);
                break;
            case "Bandit":
                const bandit = new Bandit(enemy.name);
                enemyList.push(bandit);
        }
    });
    return enemyList;
};

const randomEnemies = () => { //function that decides how many enemies will be on a fight at random
    const inFightEnemies = [];
    const enemyList = enemyListGen();
    const random = Math.floor(Math.random() * 3) + 1; //random number between 1 and 3 to avoid empty fights
    for (let i = 0; i < random; i++) {
        const randomEnemy = Math.floor(Math.random() * enemyList.length);
        inFightEnemies.push(enemyList[randomEnemy]); //Choose and push random enemy
        enemyList.splice(randomEnemy, 1); //Delete that enemy from the array so it can't get chosen again
    }
    return inFightEnemies;
};




export { Game, randomEnemies };
