
import { initDeck } from "./classes/cards";
import { Mage, Bandit } from "./classes/enemies";
import Game from "./classes/game";
import Player from "./classes/player";
import displayEnemyStatsHTML from "./UI/enemyStats";
import displayPlayerStatsHTML from "./UI/playerStats";
import {displayDiscardHTML, displayDeckHTML, displayScoreHTML} from "./UI/displayInfo"
import displayCard from "./UI/cardVisual";

const player = new Player("Blue");
const enemy = new Mage("Chris Angel", 0.2);
const enemy2 = new Bandit("Slime", 0.4);
const enemy3 = new Bandit("Slime 2", 0.4);


const game = new Game(player, [enemy, enemy3, enemy2]);

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



document.getElementById("endButton").addEventListener("click", () => {
  game.endTurn()
});


export const updateUI = () => {
  displayPlayerStatsHTML(game);
  displayEnemyStatsHTML(game);
  displayDeckHTML(game);
  displayDiscardHTML(game);
  displayScoreHTML(game);
  displayCard(game.player.hand);
  game.addEventListeners();
  game.enemies.forEach(enemy => {
    if(enemy.health <= 0){
      enemy.isAlive = false
    }
  })
  if (game.player.health <= 0){
    game.gameOver();
  };
}

// startScreen();
game.start()
game.state = "PLAYER_TURN"

export {game} 