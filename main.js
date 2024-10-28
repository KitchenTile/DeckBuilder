
import { Game, randomEnemies } from "./classes/game";
import Player from "./classes/player";
import displayEnemyStatsHTML from "./UI/enemyStats";
import displayPlayerStatsHTML from "./UI/playerStats";
import {displayDiscardHTML, displayDeckHTML, displayScoreHTML} from "./UI/displayInfo"
import { displayCard } from "./UI/cardVisual";
import navBar from "./UI/navBar";

//Display the navbar
navBar();

//manage login and set user name

let loggedInUser = sessionStorage.getItem('loggedInUser');
let currentPlayer = JSON.parse(localStorage[sessionStorage["loggedInUser"]])

if (!loggedInUser) {
  // If no user is logged in, redirect to login page
  window.location.href = "HOME.html";
} 


// Game starts here
const player = new Player(currentPlayer.name);

let game = new Game(player, randomEnemies());


// This function is for battle replayability
export const subsequentBattles = (player) => {
  console.log("new game function called")
  game = new Game(player, randomEnemies())
  game.start()
}

//This function just updates the UI . Get's called after virtually every action.
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
      enemy.nextMove.move = "-"
    }
  })

  //Game end condition
  if (game.player.health <= 0){
    game.gameOver();
  };
  
  if (game.player.currentTile <= 3) {
    game.winScreen(game.enemies);

  }
}

game.start()
