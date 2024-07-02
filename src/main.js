import { initDeck } from "./classes/cards";
import { Mage, Bandit } from "./classes/enemies";
import Player from "./classes/player";

// const canvas = document.getElementById("gameGrid");
// const ctx = canvas.getContext("2d");

// // TIle dimensions
// const tileX = 40;
// const tileY = 40;

// // Grid rows and cols
// const rows = 10;
// const cols = 10;



// const createGrid = (rows, cols) => {
//   //  I make a grid with xs and ys filled with 0s using two for loops 
//   let grid = [];
//   for (let x = 0; x < rows; x++) {
//       let row = [];
//       for (let y = 0; y < cols; y++) {
//           row.push(0);
//       }
//       grid.push(row);
//   }
//   return grid;
// }

// // I check that the selected x and y are positive and within my grid array
// const gridBounds = (x, y, rows, cols) => {
//   return x >= 0 && x < rows && y >= 0 && y < cols;
// }


// const generateRandomPath = (grid, rows, cols) => {

//   // I select the first row and set it to 0,
//   // then I grab an element y from a random column
//   // and set it to 2, this marks the "first" tile
//   // in our array.
//   let x = 0;
//   let y = Math.floor(Math.random() * cols);
//   grid[x][y] = 2;

//   // While x is smaller than the length of our columns
//   // choose a random direction (left, right or down) 
//   // and "move" in that direction with a 1.

//   while (x < rows - 1) {

//     // let direction = Math.floor(Math.random() * 3);
//     // if (direction === 0 && gridBounds(x, y - 1, rows, cols)) {
//     //     y--; // move left
//     // } else if (direction === 1 && gridBounds(x, y + 1, rows, cols)) {
//     //     y++; // move right
//     // } else if (gridBounds(x + 1, y, rows, cols)) { 
//     //     x++; // move down
//     // }


//     let direction = Math.random();

//     if (direction < 0.2 && gridBounds(x, y - 1, rows, cols)) {
//       y--; // move left
//     } else if (direction < 0.4 && gridBounds(x, y + 1, rows, cols)) {
//       y++; // move right
//     } else if (direction < 1.0 && gridBounds(x + 1, y, rows, cols)) {
//       x++; // move down
//     }
//     // As long as the it's not the "first" or "last" tile move with a 1
//     if (grid[x][y] !== 2){
//     grid[x][y] = 1;
//     }
//   }


//   // Mark the "last" tile with a 2
//   grid[x][y] = 2;

//   return grid;
// }

// const displayGrid = (grid, tileX, tileY) => {

//   // Display grid

//   grid.forEach((row, rowIndex) => {
//     console.log(row.join(" "))
//     row.forEach((col, colIndex) => {
//       switch(col) {
//         case 0:
//           // console.log("0")
//           ctx.fillStyle = "black"
//           break;
//         case 1: 
//           // console.log("1")
//           ctx.fillStyle = "white"
//           break;
//         case 2:
//           // console.log("2")
//           ctx.fillStyle = "brown"
//           break;
//       }
//       ctx.fillRect(tileX * colIndex, tileY * rowIndex, tileX, tileY)
//     })
//   })
  
// }


// let grid = createGrid(rows, cols);
// grid = generateRandomPath(grid, rows, cols);
// displayGrid(grid, tileX, tileY);



const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

console.log(context);



const player = new Player("Blue");
const enemy = new Mage("Chris Angel", 0.4);
const enemy2 = new Bandit("Archer", 0.6);

initDeck(player);

// player.useCard("Slash", enemy);
// player.useCard("Slash", enemy2);

// player.useCard("Chicken Leg", player);

// enemy.buff(enemy2);
// enemy2.anger();
// enemy2.attack(player);

// player.useCard("Chain Mail", enemy);

// player.useCard("Chain Mail", player);

// enemy.attack(player);



enemy.heal(enemy2);

player.displayStats();

const scale = window.devicePixelRatio;
canvas.width = 800 * scale;
canvas.height = 600 * scale;
context.scale(scale, scale);


const addText = (text, x, y) => {
  context.fillStyle = "white";
  context.font = '16px Helvetica';
  context.fillText(text, x, y)
}

const displayPlayerStats = () => {
  addText(`${player.name}'s Stats`, 20, 30);
  addText(`Health: ${player.health}`, 20, 70);
  addText(`Armor: ${player.armor}`, 20, 90);
  addText(`Energy: ${player.energy}`, 20, 110);
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
    const x = 20 + index * 180;
    addText(`${card.title} - Energy: ${card.energyCost}`, x, 300)
  })
}

const updateUI = () => {
  displayPlayerStats();
  displayEnemyStats();
  displayDeck();
}

updateUI();