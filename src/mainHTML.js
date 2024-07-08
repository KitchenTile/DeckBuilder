import { initDeck } from "./classes/cards";
import { Mage, Bandit } from "./classes/enemies";
import Game from "./classes/game";
import Player from "./classes/player";

const player = new Player("Blue");
const enemy = new Mage("Chris Angel", 0.2);
const enemy2 = new Bandit("Archer", 0.6);

const game = new Game(player, [enemy]);

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


let printLog = "";

// const scale = window.devicePixelRatio;
// canvas.width = 950 * scale;
// canvas.height = 600 * scale;
// context.scale(scale, scale);

export const logToPrint = (message) => {
  printLog = message;
  // canvasPrint();
}

// export const canvasPrint = () => {
//   addText(printLog, 230, 180)
// }


// const addText = (text, x, y) => {
//   context.fillStyle = "white";
//   context.font = '16px Helvetica';
//   context.fillText(text, x, y);
// }


const clearUI = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const displayPlayerStats = () => {
  addText(`${player.name}'s Stats`, 20, 30);
  addText(`Health: ${player.health}`, 20, 70);
  addText(`Armor: ${player.armor}`, 20, 90);
  addText(`Energy: ${player.energy}`, 20, 110);
}

const displayPlayerStatsHTML = () => {
    const playerStats = document.getElementById("player_stats")

    playerStats.innerHTML = `
        ${player.name}'s stats
        Health: ${player.health}
        Armor: ${player.armor}
        Energy: ${player.energy}
    `
}

const displayEnemyStats = () => {
  addText(`${enemy.name}'s Stats`, 600, 30);
  addText(`Type: ${enemy.type}`, 600, 70);
  addText(`Health: ${enemy.health}`, 600, 90);
  addText(`Damage: ${enemy.damage}`, 600, 110);
}

const displayDeck = () => {
  addText(`Deck`, 20, 250);
  player.deck.forEach((card, index) => {
    const x = 20 + index * 190;
    if (x < 460){
      addText(`${card.title} - Energy: ${card.energyCost}`, x, 300);
    } else {
      addText(`${card.title} - Energy: ${card.energyCost}`, x - 570, 350);
    }
  })
}

const displayHand = () => {
  addText(`Hand`, 20, 450);
  player.hand.forEach((card, index) => {
    const x = 20 + index * 200;
    if (x < 450){
        addText(`${card.title} - Energy: ${card.energyCost}`, x, 500);
        card.pos = { x: x - 10, y: 470, width: 200, height: 30}
      } else {
        addText(`${card.title} - Energy: ${card.energyCost}`, x - 600, 550);
        card.pos = { x: x - 610, y:520, width:200, height:30 }
      }
    })
}


const displayDiscard = () => {
  addText(`Discard Pile: ${player.discardPile.length}`, 600, 450);
}

const displayNextTurn = () => {
  addText("END TURN", 320, 90);
}

// const endTurn = () => {
//   player.discardHand();
//   enemy.turn(player);
//   player.getHand();
//   player.energy = 3;
//   player.armor = 0;
//   updateUI()
// }


canvas.addEventListener("click", (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (x >= 310 && x <= 410 && y >= 70 && y <= 100){
    game.endTurn();    
  }

  player.hand.forEach(card => {
    if (x >= card.pos.x && x <= card.pos.x + card.pos.width) {
      if (y >= card.pos.y && y <= card.pos.y + card.pos.height) {
        player.useCard(card.title, card.type === "attack" ? enemy : player)
        updateUI()
      }
    }
  })

})

export const updateUI = () => {
  clearUI();
  displayPlayerStats();
  displayEnemyStats();
  displayDeck();
  displayDiscard();
  displayHand();
  displayNextTurn();
  canvasPrint();
  if (enemy.health <= 0) {
    clearUI();
    addText(`${enemy.name} has been defeated`, 350, 200);
    addText(`${player.name} has earned $5`, 350, 250);
    player.cash += 5;
    addText()
  } else if (player.health <= 0) {
    clearUI();
    game.state = "GAME_OVER";
  }
}

// startScreen();
game.start()
game.state = "PLAYER_TURN"