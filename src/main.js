
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
const enemy2 = new Bandit("Archer", 0.6);

const game = new Game(player, [enemy, enemy2]);

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


// const scale = window.devicePixelRatio;
// canvas.width = 950 * scale;
// canvas.height = 600 * scale;
// context.scale(scale, scale);

// export const canvasPrint = () => {
//   addText(printLog, 230, 180)
// }


// const addText = (text, x, y) => {
//   context.fillStyle = "white";
//   context.font = '16px Helvetica';
//   context.fillText(text, x, y);
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
  });
}

// startScreen();
game.start()
game.state = "PLAYER_TURN"