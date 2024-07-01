import { Card, initDeck } from "./classes/cards";
import { Enemy, Mage, Bandit } from "./classes/enemies";
import Player from "./classes/player";

const canvas = document.getElementById("gameGrid");
const ctx = canvas.getContext("2d");

// TIle dimensions
const tileX = 40;
const tileY = 40;

// Grid rows and cols
const rows = 10;
const cols = 10;



const createGrid = (rows, cols) => {
  //  I make a grid with xs and ys filled with 0s using two for loops 
  let grid = [];
  for (let x = 0; x < rows; x++) {
      let row = [];
      for (let y = 0; y < cols; y++) {
          row.push(0);
      }
      grid.push(row);
  }
  return grid;
}

// I check that the selected x and y are positive and within my grid array
const gridBounds = (x, y, rows, cols) => {
  return x >= 0 && x < rows && y >= 0 && y < cols;
}


const generateRandomPath = (grid, rows, cols) => {

  // I select the first row and set it to 0,
  // then I grab an element y from a random column
  // and set it to 2, this marks the "first" tile
  // in our array.
  let x = 0;
  let y = Math.floor(Math.random() * cols);
  grid[x][y] = 2;

  // While x is smaller than the length of our columns
  // choose a random direction (left, right or down) 
  // and "move" in that direction with a 1.

  while (x < rows - 1) {

    // let direction = Math.floor(Math.random() * 3);
    // if (direction === 0 && gridBounds(x, y - 1, rows, cols)) {
    //     y--; // move left
    // } else if (direction === 1 && gridBounds(x, y + 1, rows, cols)) {
    //     y++; // move right
    // } else if (gridBounds(x + 1, y, rows, cols)) { 
    //     x++; // move down
    // }


    let direction = Math.random();

    if (direction < 0.2 && gridBounds(x, y - 1, rows, cols)) {
      y--; // move left
    } else if (direction < 0.4 && gridBounds(x, y + 1, rows, cols)) {
      y++; // move right
    } else if (direction < 1.0 && gridBounds(x + 1, y, rows, cols)) {
      x++; // move down
    }
    // As long as the it's not the "first" or "last" tile move with a 1
    if (grid[x][y] !== 2){
    grid[x][y] = 1;
    }
  }


  // Mark the "last" tile with a 2
  grid[x][y] = 2;

  return grid;
}

const displayGrid = (grid, tileX, tileY) => {

  // Display grid

  grid.forEach((row, rowIndex) => {
    console.log(row.join(" "))
    row.forEach((col, colIndex) => {
      switch(col) {
        case 0:
          // console.log("0")
          ctx.fillStyle = "black"
          break;
        case 1: 
          // console.log("1")
          ctx.fillStyle = "white"
          break;
        case 2:
          // console.log("2")
          ctx.fillStyle = "brown"
          break;
      }
      ctx.fillRect(tileX * colIndex, tileY * rowIndex, tileX, tileY)
    })
  })
  
}


let grid = createGrid(rows, cols);
grid = generateRandomPath(grid, rows, cols);
displayGrid(grid, tileX, tileY);

const player = new Player("Blue");
const enemy = new Mage("Mage", 0.1);
const enemy2 = new Bandit("Archer", 0.1);

initDeck(player);
console.log(player.deck);
player.displayDeck();

// const attackCard = new Card("Slash", "attack", -10, "A deadly slash", 2);
// const chainMail = new Card("Chain Mail", "defense", 5, "Prevents slashes", 1);
// const chickenLeg = new Card("Chicken Leg", "charger", 2, "A healthy dose of protein", 0);

player.useCard("Slash", enemy);
player.useCard("Slash", enemy);

console.log(player.deck);

player.useCard("Chicken Leg", player);

console.log(`Energy left: ${player.energy}`);
// console.log(`${attackCard.type}`);
// console.log(`${chainMail.type}`);

// enemy.buff(enemy2);
// enemy2.anger();
// enemy2.attack(player);
// console.log(`Player Health: ${player.health}`);
console.log(`Enemy Health: ${enemy.health}`);
console.log(`Player armor: ${player.armor}`);
console.log(player.deck);


// player.useCard(chickenLeg, player);
// console.log(`Energy left: ${player.energy}`);





