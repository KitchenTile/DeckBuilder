//Create a game class to manage turn based logic

import { updateUI } from "../main";
import { initDeck } from "./cards";

export default class Game  {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.state = "START_GAME";
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
            enemy.turn(this.player);
        });
        this.state = "PLAYER_TURN"
        updateUI();
        this.loop();

    }

    endTurn() {
        this.player.discardHand();
        this.state = "ENEMY_TURN";
        updateUI();
        this.loop()
    }

    gameOver() {
        console.log("Game Over")
        console.log(`${this.player.name}'s cashed out at: ${this.player.cash} money`)
    }
}