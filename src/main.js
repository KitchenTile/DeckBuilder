import { initDeck } from "./classes/cards";
import { Mage, Bandit } from "./classes/enemies";
import Game from "./classes/game";
import Player from "./classes/player";
import displayEnemyStatsHTML from "./UI/enemyStats";
import displayPlayerStatsHTML from "./UI/playerStats";
import {displayDiscardHTML, displayDeckHTML, displayScoreHTML} from "./UI/displayInfo"
import displayCard from "./UI/cardVisual";

const player = new Player("Blue");
const enemy = new Mage("Chris Angel");
const enemy2 = new Bandit("Slime");
const enemy3 = new Bandit("Slime 2");

const enemyList = [enemy, enemy2, enemy3]

const randomEnemies = () => { //function that decides how many enemies will be on a fight at random
  const inFightEnemies = [];
  const random = Math.floor(Math.random() * enemyList.length + 1)
  for (let i = 0; i < random; i++) {
      inFightEnemies.push(enemyList[i]);  
  }
  return inFightEnemies;
}

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
  game.winScreen(game.enemies);
}

// startScreen();
game.start()
game.state = "PLAYER_TURN"
