import { initDeck } from "./classes/cards";
import { Mage, Bandit } from "./classes/enemies";
import { Game, randomEnemies } from "./classes/game";
import Player from "./classes/player";
import displayEnemyStatsHTML from "./UI/enemyStats";
import displayPlayerStatsHTML from "./UI/playerStats";
import {displayDiscardHTML, displayDeckHTML, displayScoreHTML} from "./UI/displayInfo"
import displayCard from "./UI/cardVisual";
import enemyData from "./data/enemyData";

const player = new Player("Blue");

const game = new Game(player, randomEnemies());

//In order to remove the click event listener I need to have the function not be anonymous  
// const startEvent = () => {
//     game.start();
//     game.state = "PLAYER_TURN"
//     canvas.removeEventListener("click", startEvent);
// }


// const startScreen = () => {
//   addText("START SCREEN - CLICK ANYWHERE TO START", 250, 300);
//   canvas.addEventListener("click", startEvent);
// }



// document.getElementById("endButton").addEventListener("click", () => {
//   game.endTurn()
// });


export const updateUI = () => {
  displayPlayerStatsHTML(game);
  displayEnemyStatsHTML(game);
  displayDeckHTML(game);
  displayDiscardHTML(game);
  displayScoreHTML(game);
  displayCard(game.player.hand);
  // game.endTurnEventListener();
  if (game.state === "PLAYER_TURN") {
    game.addEventListeners();
    console.log("player turn");
  }
  game.mapEventListener();
  game.enemies.forEach(enemy => {
    if(enemy.health <= 0){
      enemy.isAlive = false
      enemy.health = "☠"
      enemy.nextMove.move = "-"
    }
  })
  if (game.player.health <= 0){
    game.gameOver();
  };
  game.winScreen(game.enemies);
}

// startScreen();
game.start()
// game.state = "PLAYER_TURN"
