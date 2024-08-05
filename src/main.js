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



let game = new Game(player, randomEnemies());

export const subsequentBattles = (player) => {
  console.log("new game function called")
  game = new Game(player, randomEnemies())
  console.log(game.enemies)
  game.start()
}

export const updateUI = () => {
  displayPlayerStatsHTML(game);
  displayEnemyStatsHTML(game);
  displayDeckHTML(game);
  displayDiscardHTML(game);
  displayScoreHTML(game);
  displayCard(game.player.hand);
  game.updateMap();
  game.addEventListeners();
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

game.start()
